import React, { Component } from 'react';
import WebView from 'react-native-webview';
import {View,StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

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
            agentpassword: "",
            usertoken: "",
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
        let agentpassword= await AsyncStorage.getItem('@Apex_Health:agentpassword');
        let usertoken = await AsyncStorage.getItem('@Apex_Health:usertoken');
        this.setState({today: today,agentid: agentid,agentpassword: agentpassword,usertoken: usertoken})
    }
    render() {
        console.log(this.state.agentid)
        console.log(this.state.agentpassword)
        console.log(this.state.usertoken)
        return (
          <View style={styles.container}>
            <WebView
              source={{uri: 'http://210.68.227.123:8006/Mobile_Login.aspx?login='+this.state.usertoken+'&page=9&Agent_ID='+this.state.agentid+'&date='+this.state.today+'&Agent_LV=70'}}
              style={styles.video}
            />
          </View>
        );
    }
}

export default LoadWebView