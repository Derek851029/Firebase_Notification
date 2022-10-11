/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {Alert, StyleSheet, View,Modal} from 'react-native'
import React, { Component } from 'react';
import {Actions, Router, Scene} from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";

import Login from './Login';

import LoadWeb_Work from './LoadWeb_Work';
import LoadWeb_Msg from './LoadWeb_Msg';
import TakePhoto from './TakePhoto';
import LoadWeb_Task from './LoadWeb_Task';
import LoadWeb_TaskLog from './LoadWeb_TaskLog';
import LoadWeb_Contact from './LoadWeb_Contact';

 
const styles = StyleSheet.create({

  tabBar: {
    height: 80,
    borderTopColor: 'darkgrey',
    borderTopWidth: 1,
    opacity: 0.98,
    justifyContent:'center',
  },
  titleStyle:{
    color: 'red'
  }
});
 
export default class App extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      agentid: "",
    }
  }

  componentDidMount =  async () => {
    let agentid =  await AsyncStorage.getItem('@Apex_Health:agentid');
    this.setState({agentid: agentid})
    this.createChannel()

    messaging().onMessage(async remoteMessage =>{
      console.log(remoteMessage)
      PushNotification.localNotificationSchedule({
        channelId:"1",
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body, // (required)
        date: new Date(Date.now()),
        allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
      });
    }) //App開啟時不會跳訊息, 要用這個處理

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    }); //App縮小時可以直接推撥
  }

  createChannel (){
    PushNotification.createChannel(
        {
        channelId: "1", // (required)
        channelName: "Remote", // (required)
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }
   
   Logout = async() =>{
    AsyncStorage.clear();
    Alert.alert(
      "提醒:",
      "登出成功",
      [
        { text: "OK", onPress: () => this.setState({agentid: null})}
      ]
    )
    
   }
 
   render() {
     const Work = () =>(
      <Icon name='md-swap-vertical-outline' size={40} color='#FFB6C1'></Icon>
    )

    const notifications = () =>(
      <Icon name='notifications' size={40} color='#FFB6C1'></Icon>
    )
    const Camera = () =>(
      <Icon name='camera-sharp' size={40} color='#FFB6C1'></Icon>
    )
    const Task = () =>(
      <Icon name='calendar' size={40} color='#FFB6C1'></Icon>
    )
    const Task_Log = () =>(
      <Icon name='book' size={40} color='#FFB6C1'></Icon>
    )
    const Contact = () =>(
      <Icon name='chatbox-ellipses' size={40} color='#FFB6C1'></Icon>
    )

   const RootStack = () =>{
      return(
        <Router>
          <Modal>
            <Scene key="Login" component={Login} title="登入" hideTabBar={true} hideNavBar={true} initial></Scene>
            <Scene key="root" tabs={true} tabBarStyle={styles.tabBar} inactiveTintColor='black' hideNavBar={true} labelStyle={{fontSize: 15}}>
              <Scene key="LoadWeb_Work" component={LoadWeb_Work} title="上班/下班" icon={Work} rightTitle="登出" rightButtonTextStyle={{color: 'red',fontSize: 20}} onRight={() =>{this.Logout()}}></Scene>
              <Scene key="LoadWeb_Msg" component={LoadWeb_Msg} title="通知" icon={notifications} rightTitle="登出" rightButtonTextStyle={{color: 'red',fontSize: 20}} onRight={() =>{this.Logout()}} initial></Scene>
              <Scene key="TakePhoto" component={TakePhoto} title="拍照" icon={Camera} rightTitle="登出" rightButtonTextStyle={{color: 'red',fontSize: 20}} onRight={() =>{this.Logout()}}></Scene>
              <Scene key="LoadWeb_Task" component={LoadWeb_Task} title="任務" icon={Task} rightTitle="登出" rightButtonTextStyle={{color: 'red',fontSize: 20}} onRight={() =>{this.Logout()}}></Scene>
              <Scene key="LoadWeb_TaskLog" component={LoadWeb_TaskLog} title="工作日誌" icon={Task_Log} rightTitle="登出" rightButtonTextStyle={{color: 'red',fontSize: 20}} onRight={() =>{this.Logout()}}></Scene>
              <Scene key="LoadWeb_Contact" component={LoadWeb_Contact} title="通訊錄" icon={Contact} rightTitle="登出" rightButtonTextStyle={{color: 'red',fontSize: 20}} onRight={() =>{this.Logout()}}></Scene>
            </Scene>
          </Modal>
        </Router>
      )
     
   };  
     return <RootStack />;
   }
}