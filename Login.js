import React, { Component,useEffect } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Button,
  Keyboard,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import PushNotification from "react-native-push-notification";
import fetch from 'react-native-fetch-polyfill';
import Dialog from "react-native-dialog";
import messaging from '@react-native-firebase/messaging';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      account: "",
      password: "",
      SYSID: "",
      fetch_data:[],
      loading: false,
      visible: false,
    }
  }


  componentDidMount =  async () => {
    messaging().onMessage(async remoteMessage =>{
      console.log(remoteMessage)
    })
    this.createChannel()
  }

  createChannel (){
    PushNotification.createChannel(
        {
        channelId: "2", // (required)
        channelName: "Schedule", // (required)
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }

  NewNotification = () =>{
    let fetch_data = this.state.fetch_data
    console.log(fetch_data)
    for(let i=0; i<fetch_data.length;i++){
      let Now = new Date()
      let obj = fetch_data[i]

      let Visit_Customer = obj.Visit_Customer
      let Visit_Content = obj.Visit_Content

      let Visit_Date_str = (obj.Visit_Date.replace('T',' ')).replace(/\-/g, "/") //2021-08-06T10:10:00 replace 'T' to blank and replace - to /
      let Visit_Date = new Date(Visit_Date_str)
      let push_noti_day = parseInt(Visit_Date - Now) -300000 //is before 5min
      console.log(push_noti_day)
      if(push_noti_day>0){
        PushNotification.localNotificationSchedule({
          channelId:"2",
          message: "提醒您，五分鐘後將於"+Visit_Customer+"進行會議，會議內容:"+Visit_Content+"", // (required)
          date: new Date(Date.now() + push_noti_day),
          allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
        });
        console.log('success123')
      }
    }
    this.setState({visible:true,loading:false})
    this.getToken()
    // PushNotification.localNotificationSchedule({
    //   channelId:"1",
    //   message: "新消息", // (required)
    //   date: new Date(Date.now() + 1 * 1000),
    //   allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
    // });
    // console.log('123')
    
  }

  Get_Schedule = async() =>{
    const parseString = require('react-native-xml2js').parseString;
    let SYSID = await AsyncStorage.getItem('@Apex_Health:SYSID');
    console.log(SYSID)
    let json_data;
    
    fetch('http://210.68.227.123:8006/Notification.asmx/Get_Schedule',{
    timeout:1000,
    method : 'POST',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'Agent_SYSID='+SYSID+'',
    })
    .then(response => response.text())
    .then((response) =>{
        parseString(response, async function (err, result) {
            json_data = JSON.parse(result.string._)
        })
        this.setState({fetch_data:json_data})
        this.NewNotification()
    })
    .catch((e)=>{
        console.log(e)
        Alert.alert(
            "警告:",
            "伺服器發生錯誤，請重新嘗試或洽詢管理員",
            [
                { text: "OK", onPress: () => {this.setState({loading: false});} }
            ]
        );
    })     
  }


  onPressLogin = async() =>{
    this.setState({loading:true})
    let agentid = this.state.account;
    let agentpassword = this.state.password;
    let status;
    let SYSID;  
    if(agentid != "" && agentpassword != ""){
      const parseString = require('react-native-xml2js').parseString;
      fetch('http://210.68.227.123:8006/SNISResponse.asmx/Login',{
              method : 'POST',
              headers: {
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: 'Agent_ID='+agentid+'&Agent_PWD='+agentpassword+'&API_KEY=kB3UxXV5fNywMh7',
        })
          .then(response => response.text())
          .then((response) =>{
            parseString(response, async function(err,result){
              if(result.response.Logins[0].Status){
                await AsyncStorage.setItem('@Apex_Health:SYSID', result.response.Logins[0].Status[0].$.SYSID);
                await AsyncStorage.setItem('@Apex_Health:agentid',agentid)
                await AsyncStorage.setItem('@Apex_Health:agentpassword',agentpassword)
                await AsyncStorage.setItem('@Apex_Health:usertoken', result.response.Logins[0].Status[0].$.Login_status);
                SYSID = result.response.Logins[0].Status[0].$.SYSID
                status = true
              }
              else{
                var login_status = result.response.Logins[0].Login_status[0];
                if (login_status.$.success == 'False') {
                  Alert.alert(
                    "警告:",
                    "帳號或密碼輸入錯誤，請重新輸入",
                    [
                      { text: "OK", onPress: () => {}}
                    ]
                  )
                  status = false
                }
              }
            })
            if(status != false){
              this.setState({SYSID:SYSID})
              this.Get_Schedule()
            }else{
              this.setState({loading:false})
            }
        });
    }
    else{
      if(this.state.account == ""){
        Alert.alert(
          "警告:",
          "請輸入使用者名稱。",
          [
            { text: "OK", onPress: () => this.onPressCancel()}
          ]
        )
      }
      else if(this.state.password == ""){
        Alert.alert(
          "警告:",
          "請輸入密碼",
          [
            { text: "OK", onPress: () => this.onPressCancel()}
          ]
        )
      }
    }
  }

  onPressCancel = () =>{
    AsyncStorage.clear();
    this.setState({account: "",password: "",loading:false});
  }

  Action = () =>{
    Actions.reset('root')
  }

  getToken = async (onRegister) => {
    let Device_token;
    messaging().getToken()
    .then(fcmToken => {
      Device_token = fcmToken
      this.Update_Device_token(Device_token)
      console.log(fcmToken)
    })
    .catch(error => {
      console.log(error)
    })
  }

  Update_Device_token = async(Device_token) =>{
    const parseString = require('react-native-xml2js').parseString;
    let SYSID = await AsyncStorage.getItem('@Apex_Health:SYSID')
    console.log(SYSID)
    fetch('http://210.68.227.123:8006/Notification.asmx/Update_Device_token',{
    timeout:1000,
    method : 'POST',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'SYSID='+SYSID+'&token='+Device_token+'',
    })
    .then(response => response.text())
    .then((response) =>{
        parseString(response, async function (err, result) {
          console.log(result)
        })
    })
    .catch((e)=>{
        console.log(e)
        Alert.alert(
            "警告:",
            "伺服器發生錯誤，請重新嘗試或洽詢管理員",
            [
                { text: "OK", onPress: () => {} }
            ]
        );
    }) 
  }

  render(){
    let lists = []
    let fetch_data = this.state.fetch_data
    if(fetch_data.length == 0){
      lists.push(
        <Dialog.Description>今日無行程</Dialog.Description>
      )
    }
    for(let i = 0; i<fetch_data.length; i++){
      let obj = fetch_data[i]
      let Visit_Customer = obj.Visit_Customer
      let Visit_Content = obj.Visit_Content
      let Visit_Date = obj.Visit_Date.replace("T"," ")
      console.log(Visit_Customer)
      lists.push(
        <Dialog.Description>地點:{Visit_Customer} 時間:{Visit_Date}</Dialog.Description>
      )
    }
    
    return(
        <View style={{flex:1}}>
        {this.state.loading &&<View style={styles.loading}><ActivityIndicator  size='large' color='#00ff00'></ActivityIndicator></View>}
        <TouchableOpacity activeOpacity={1} onPress={()=>{Keyboard.dismiss()}}>
        <View style={{alignItems:'center',paddingTop:50}}>
            <Image style={styles.logo} source={require('./assets/images/logo.png')}></Image>
        </View>
        
            <View style={styles.form}>
                <View>
                    <View style={styles.username}>
                        <Icon
                        name="person"
                        style={styles.icon22}
                        ></Icon>
                        <TextInput
                        placeholder="使用者名稱"
                        placeholderTextColor="rgb(180, 191, 183)"
                        secureTextEntry={false}
                        onChangeText = {(text)=>this.setState({account:text})}
                        style={styles.usernameInput}
                        ></TextInput>
                    </View>
                    <View style={styles.password}>
                        <Icon
                        name="lock-closed"
                        style={styles.icon2}
                        ></Icon>
                        <TextInput
                        placeholder="密碼"
                        placeholderTextColor="rgb(180, 191, 183)"
                        secureTextEntry={true}
                        onChangeText = {(text)=>this.setState({password:text})}
                        style={styles.passwordInput}
                        ></TextInput>
                    </View>
                </View>
                <View style={styles.usernameColumnFiller}></View>
                <TouchableOpacity
                onPress={this.onPressLogin}
                style={styles.login_btn}
                >
                <Text style={styles.text}>登入</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
        <Dialog.Container visible={this.state.visible}>
          <Dialog.Title>以下為您今日行程</Dialog.Title>
          {lists}
          <Dialog.Button label="確定" onPress={this.Action}></Dialog.Button>
        </Dialog.Container>
        </View>
    )
  } 
}

const styles = StyleSheet.create({
loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.8,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
},

logo: {
  width: 350,
  height: 100,
},

form: {
    height: 230,
    marginTop: 60
},

username: {
    height: 59,
    borderRadius: 5,
    flexDirection: "row"
},
icon22: {
    color: "rgb(180, 191, 183)",
    fontSize: 30,
    marginLeft: 20,
    alignSelf: "center"
},
usernameInput: {
    height: 40,
    color: "rgb(59, 61, 59)",
    flex: 1,
    marginRight: 11,
    marginLeft: 11,
    marginTop: 14,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
},

password: {
    height: 59,
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 27
},
icon2: {
    color: "rgb(180, 191, 183)",
    fontSize: 33,
    marginLeft: 20,
    alignSelf: "center"
},
passwordInput: {
    height: 40,
    color: "rgb(59, 61, 59)",
    flex: 1,
    marginRight: 11,
    marginLeft: 11,
    marginTop: 14,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
},

usernameColumnFiller: {
    flex: 1
},
login_btn: {
    height: 59,
    backgroundColor: "rgb(219, 120, 13)",
    borderRadius: 5,
    justifyContent: "center",
    marginLeft:20,
    marginRight:20,
},
text: {
    fontSize: 20,
    color: "rgba(255,255,255,1)",
    alignSelf: "center"
},
});

export default LoginScreen;

