import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image,Alert } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      resourcePath: "",
    };
  }

  componentDidMount = () =>{
    this.requestCameraPermission();
  }

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message:"App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  OpenCamera = () => {
    var options = {
      mediaType: 'photo'
    };

    ImagePicker.launchCamera(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
    } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
    } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
    } else {
      Alert.alert(
          "提醒:",
          "拍照成功",
          [
            { text: "OK", onPress: () => {this.setState({resourcePath: res.uri})}}
          ]
      );
      }
    });
  };
  
  selectFile = () =>{
    var options = {
    };

    ImagePicker.launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
    } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
    } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
    } else {
      Alert.alert(
          "提醒:",
          "選擇完成",
          [
            { text: "OK", onPress: () => {this.setState({resourcePath: res.uri})}}
          ]
      );
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Image
            source={{ uri: this.state.resourcePath }}
            style={{ width: 300, height: 200 }}
          />
          <Text style={{ alignItems: 'center' }}>
            {this.state.resourcePath.uri}
          </Text>     
        </View>
        <TouchableOpacity style={styles.button} onPress={this.selectFile}><Text style={styles.buttonText}>選擇照片</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.OpenCamera}><Text style={styles.buttonText}>拍攝照片</Text></TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  button: {
    width: 250,
    height: 60,
    backgroundColor: '#3740ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom:12    
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff'
  }
});