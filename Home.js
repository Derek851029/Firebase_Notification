import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableHighlight,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import AsyncStorage from '@react-native-async-storage/async-storage';
/*
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});*/

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 0,ip: 0 }
  }
  TakePhoto_Camera = () =>{
      Actions.TakePhoto()
  }
//   componentDidMount() {
//     clearTimeout();
//   }
//     onPressOfflineTable = () => {
//         //this.props.navigation.navigate('LoadLocalWebView', {link: require('./offline_docs/a.html'), title: '離線表單'});
//         Actions.OfflineTableScreen({title: '離線表單'});
//     }
//     onPressOnlineTable = async () => {
//         //const { ip } = this.state.ip;
//       //this.props.navigation.navigate('LoadWebView', {link: 'http://'+global.server_ip+'/0140010000/0140010002.aspx?seqno=052111024951110049', title: '線上表單'});
//         //this.props.navigation.navigate('OnlineTableScreen');test
//         var agentid = await AsyncStorage.getItem('@SJH:userid');
//         var usertoken = await AsyncStorage.getItem('@SJH:usertoken');
//         var date = new Date().getDate();
//         var month = new Date().getMonth() + 1;
//         var year = new Date().getFullYear();
//         var today = year+month+date;
//         this.showLoading();
//         Geolocation.getCurrentPosition(
//           (position) => {
//             //console.log(position.coords.longitude); //經度
//             //console.log(position.coords.latitude); //緯度
//             var longitude = position.coords.longitude;
//             var latitude = position.coords.latitude;
//             Actions.LoadWebView({'link' : 'http://'+global.server_ip+'/Mobile_Login.aspx?login='+usertoken+'&page=6&Agent_ID='+agentid+'&date='+today+'&Agent_LV=70&longitude='+longitude+'&latitude='+latitude+'',title: '線上表單'});
//             this.hideLoading();
//           },
//           (error) => {
//             // See error code charts below.
//             console.log(error.code, error.message);
//             Actions.LoadWebView({'link' : 'http://'+global.server_ip+'/Mobile_Login.aspx?login='+usertoken+'&page=6&Agent_ID='+agentid+'&date='+today+'&Agent_LV=70',title: '線上表單'});
//             this.hideLoading();
//           },
//           { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//        );
//         //this.props.navigation.navigate('LoadWebView', {link: 'http://'+global.server_ip+'/Mobile_Login.aspx?login='+usertoken+'&page=6&Agent_ID='+agentid+'&date='+today+'&Agent_LV=70' , title: '線上表單'});
//         //Actions.LoadWebView({'link' : 'http://'+global.server_ip+'/Mobile_Login.aspx?login='+usertoken+'&page=6&Agent_ID='+agentid+'&date='+today+'&Agent_LV=70',title: '線上表單'});
//     }
//     onPressTakePhoto = () => {
//         Actions.TakePhotoTableListScreen();
//       //this.props.navigation.navigate('TakePhotoTableListScreen');
//     }
//     onPressCalendar = async () => {
//       //this.setState({
//       //  count: this.state.count+1
//       //})
//       //this.props.navigation.navigate('Profile', { name: 'Jane' })
//       //var usertoken = await AsyncStorage.getItem('@SJH:usertoken');
//       //this.props.navigation.navigate('LoadWebView', {link: 'http://'+global.server_ip+'/Mobile_Login.aspx?login='+usertoken+'&page=3', title: '行程表'});
//       var usertoken = await AsyncStorage.getItem('@SJH:usertoken');
//       //this.props.navigation.navigate('LoadWebView', {link: 'http://'+global.server_ip+'/Mobile_Login.aspx?login='+usertoken+'&page=7', title: '行程表'});
//       var agentid = await AsyncStorage.getItem('@SJH:userid');
//       //this.props.navigation.navigate('LoadWebView', {link: 'http://'+global.server_ip+'/0140010000/0140010005.aspx?AID='+agentid, title: '行程表'});
//       Actions.LoadWebView({'link': 'http://'+global.server_ip+'/0140010000/0140010005.aspx?AID='+agentid, title: '行程表'});
//     }

//     onPressMessage = async () => {
//       //this.setState({
//       //  count: this.state.count+1
//       //})
//       //this.props.navigation.navigate('Profile', { name: 'Jane' })
//       //var usertoken = await AsyncStorage.getItem('@SJH:usertoken');
//       //this.props.navigation.navigate('LoadWebView', {link: 'http://'+global.server_ip+'/Mobile_Login.aspx?login='+usertoken+'&page=2', title: '訊息公告'});
//       var agentid = await AsyncStorage.getItem('@SJH:userid');
//       var usertoken = await AsyncStorage.getItem('@SJH:usertoken');
//       //this.props.navigation.navigate('LoadWebView', {link: 'http://'+global.server_ip+'/0350010001.aspx?seqno=0', title: '訊息公告'});
//       //this.props.navigation.navigate('LoadWebView', {link: 'http://'+global.server_ip+'/Mobile_Login.aspx?login='+usertoken+'&page=8&AID='+agentid, title: '訊息公告'});
//       Actions.LoadWebView({link: 'http://'+global.server_ip+'/Mobile_Login.aspx?login='+usertoken+'&page=8&AID='+agentid, title: '訊息公告'});
//     }
//     onPressSettings = () => {
//       //this.props.navigation.navigate('SettingsScreen');
//       Actions.SettingsScreen({title: '個人設定'});
//     }


  showLoading = () => {
      this.setState({loading: true})
  }

  hideLoading = () => {
      this.setState({loading: false})
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 50,
              bottom: 0,
              flex: 1 }}
        >
          <View style={{width: '100%', height: '16%', flexDirection: 'row', justifyContent: 'center'}}>
            <Image
              source={require('./assets/images/logo.png')}
              style={{width: 300, height: 80, marginTop: 10}}>
            </Image>
              <View style={{position: 'absolute', right:10, flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',}}>
                <TouchableHighlight style={{}} onPress={this.onPressHome}>
                  <View style={{flexDirection: 'row', justifyContent: 'center',  alignItems: 'center',}}>
                    <Image
                      source={require('./assets/images/home.png')}
                      style={{width: 25, height: 25, marginTop: 10}}>
                    </Image>

                    <Text
                      style={{
                        fontSize: 20,
                        color: 'white',
                        fontWeight: 'bold',
                        paddingTop: 10}}>
                      首頁
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
          </View>
          <View style={{width: '100%', height: '25%', flexDirection: 'row'}}>
            <View style={{width: '5%', height: '100%'}}>
            </View>
            <TouchableHighlight
              style={{backgroundColor: 'white', width: '40%', height: '100%'}}
              onPress={this.onPressOfflineTable}>
              <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'}}>
                <Image
                  source={require('./assets/images/offlinetable.png')}
                  style={{width: '25%', height: '25%'}}>
                </Image>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    paddingTop: 20, }}>
                  打卡
                </Text>
              </View>
            </TouchableHighlight>
            <View style={{width: '10%', height: '100%'}}>
            </View>
            <TouchableHighlight
              style={{backgroundColor: 'white', width: '40%', height: '100%'}}
              onPress={this.TakePhoto_Camera}>
              <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'}}>
                <Image
                  source={require('./assets/images/onlinetable.png')}
                  style={{width: '25%', height: '25%'}}>
                </Image>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    paddingTop: 20, }}>
                  拍照及攝影
                </Text>
              </View>
            </TouchableHighlight>
            <View style={{width: '5%', height: '100%'}}>
            </View>
          </View>
          <View style={{width: '100%', height: '2%', flexDirection: 'row'}}>
          </View>

          <View style={{width: '100%', height: '25%', flexDirection: 'row'}}>
            <View style={{width: '5%', height: '100%'}}>
            </View>
            <TouchableHighlight
              style={{backgroundColor: 'white', width: '40%', height: '100%'}}
              onPress={this.onPressTakePhoto}>
              <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'}}>
                <Image
                  source={require('./assets/images/takephoto.png')}
                  style={{width: '25%', height: '25%'}}>
                </Image>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    paddingTop: 20, }}>
                  巡檢作業
                </Text>
              </View>
            </TouchableHighlight>
            <View style={{width: '10%', height: '100%'}}>
            </View>
            <TouchableHighlight
              style={{backgroundColor: 'white', width: '40%', height: '100%'}}
              onPress={this.onPressCalendar}>
              <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'}}>
                <Image
                  source={require('./assets/images/calendar.png')}
                  style={{width: '25%', height: '25%'}}>
                </Image>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    paddingTop: 20, }}>
                  視訊通話
                </Text>
              </View>
            </TouchableHighlight>
            <View style={{width: '5%', height: '100%'}}>
            </View>
          </View>

          <View style={{width: '100%', height: '2%', flexDirection: 'row'}}>

          </View>
          <View style={{width: '100%', height: '25%', flexDirection: 'row'}}>
            <View style={{width: '5%', height: '100%'}}>
            </View>
            <TouchableHighlight
              style={{backgroundColor: 'white', width: '40%', height: '100%'}}
              onPress={this.onPressMessage}>
              <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'}}>
                <Image
                  source={require('./assets/images/message.png')}
                  style={{width: '25%', height: '25%'}}>
                </Image>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    paddingTop: 20, }}>
                  訊息公告
                </Text>
              </View>
            </TouchableHighlight>
            <View style={{width: '10%', height: '100%'}}>
            </View>
            <TouchableHighlight
              style={{backgroundColor: 'white', width: '40%', height: '100%'}}
              onPress={this.onPressSettings}>
              <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'}}>
                <Image
                  source={require('./assets/images/settings.png')}
                  style={{width: '25%', height: '25%'}}>
                </Image>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    paddingTop: 20, }}>
                  個人設定
                </Text>
              </View>
            </TouchableHighlight>
            <View style={{width: '5%', height: '100%'}}>
            </View>
          </View>
          {this.state.loading &&<View style={styles.loading}><ActivityIndicator  size='large' color='#00ff00'></ActivityIndicator></View>}
          <View style={{width: '100%', height: '5%', flexDirection: 'row'}}>
          </View>

        </View>
      </SafeAreaView>
    );
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
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

 export default Home;
