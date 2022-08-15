import { StatusBar, View, ActivityIndicator, Dimensions, StyleSheet  , BackHandler} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import { WEB_CLIENT_ID } from '@env';


const loader = () => {
  const { width, height } = Dimensions.get('window');

  return (
    <LinearGradient colors={['#FDD7CB', '#fff']} style={{ width, height, ...styles.linearGradient }}>
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#F96E46" />
      </View>
    </LinearGradient >
  )
}


const OnBoard = () => {
  const webViewRef = useRef();

  const handleBackPress = () => {
    BackHandler.exitApp()
  }


  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      offlineAccess: true
    })

    BackHandler.addEventListener('hardwareBackPress' , handleBackPress)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress)

    }
  }, [])

  const sendDataToApp = (data) => {
    webViewRef.current.injectJavaScript(
      `setTimeout(function() { window.getProfile(${JSON.stringify(data)}) }, 0);true;`
    );
  }

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo)
      {
        sendDataToApp(userInfo)
        await AsyncStorage.setItem('loggedIn', true)
      }
    } catch (error) {
      console.log('🚀 ~ file: App.js ~ line 31 ~ signIn ~ error', JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const updateStorage = async (value) => {
    console.log('VALUE' , value)
    try {
        await AsyncStorage.setItem('loggedIn', JSON.stringify(value));
    } catch (error) {
        console.log(error);
    }
  }


  return (
    <WebView
      source={{
         uri: 'https://habstreak.com/account'
        //uri: 'http://192.168.29.23:3000/account'
      }}
      ref={webViewRef}
      onMessage={(event) => {
        console.log('EVENT ->>>>' , event)
        const data = JSON.parse(event.nativeEvent.data)
        switch (data.event) {
          case 'google-login':
            signIn();
            break;
          case 'loggedIn':
            updateStorage(true);
            break;
          case 'loggedOut':
            updateStorage(false);
            break;
          default:
            break;
        }
      }}
      renderLoading={loader}
      startInLoadingState
    />
  )
}

export default OnBoard;

const styles = StyleSheet.create({
  loader: {
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
