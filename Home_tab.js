import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  SafeAreaView,
} from 'react-native';
import {Router, Stack, Scene,Tabs} from 'react-native-router-flux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetch from 'react-native-fetch-polyfill';
import Login from './Login';
import Home from './Home'
import TakePhoto from './TakePhoto'

const styles = StyleSheet.create({
    tabBar: {
    height: 50,
    borderTopColor: 'darkgrey',
    borderTopWidth: 1,
    opacity: 0.98,
    justifyContent:'space-between'
    }
});

class Home_tab extends React.Component {
    constructor(props) {
      super(props)
      this.state = { 
        account: "",
        password: "",
      }
    }
    render(){
        return(
            <Router>
            <Scene key="root" tabs={true} tabBarStyle={styles.tabBar}>
                <Scene key="Login" component={Login} title="登入"></Scene>
                <Scene key="Home" component={Home} title="首頁" initial></Scene>
                <Scene key="TakePhoto" component={TakePhoto} title="拍照及攝影"></Scene>
            </Scene>
            </Router>
        )
    }
}

export default Home_tab