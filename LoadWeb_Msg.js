import React, { Component } from 'react';
import WebView from 'react-native-webview';
import {View,StyleSheet,Text, TouchableHighlight, ActionSheetIOS} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    video: {
      flex: 1
    }
    });

class LoadWebView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            agentid: "",
            usertoken: "",
            SYSID:"",
            today: "",
            link: 0,
        }
    }

    componentDidMount = async() =>{
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var today = year+month+date;

        let agentid = await AsyncStorage.getItem('@Apex_Health:agentid');
        let usertoken = await AsyncStorage.getItem('@Apex_Health:usertoken');
        let SYSID = await AsyncStorage.getItem('@Apex_Health:SYSID');
        this.setState({today: today,agentid: agentid,usertoken: usertoken,SYSID: SYSID})
    }

    render() {
      let agentid = this.state.agentid
      let usertoken = this.state.usertoken
      let SYSID = this.state.SYSID
        return (
          <View style={styles.container}>
            <WebView
              source={{uri: 'http://210.68.227.123:8006/Mobile_Login.aspx?SYSID='+SYSID+'&login='+usertoken+'&Page=2&Agent_ID='+agentid+'&date='+this.state.today+'&Agent_LV=70'}}
              style={styles.video}
            />
          </View>
        );
    }
}

export default LoadWebView