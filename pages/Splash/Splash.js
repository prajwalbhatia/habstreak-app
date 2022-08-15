import { StyleSheet, Dimensions, View, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, { useEffect , useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Logo from '../../assets/Logo.svg';

const splash = () => {
  const { width, height } = Dimensions.get('window');
  

  return (
    <LinearGradient colors={['#FDD7CB', '#fff']} style={{ width, height, ...styles.linearGradient }}>
      <View style={ styles.mainContainer}>
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size="large" color="#F96E46" />
        </View>
      </View>
    </LinearGradient>
  )
}

const Splash = (props) => {
  const [isLoggedIn , setIsLoggedIn] = useState(null);

  // const getLoggedInValue = async () => {
  //       try {

  //         return new Promise((resolve , reject) => {
  //         const value = await AsyncStorage.getItem('loggedIn');

  //         })         
  //     } catch (error) {
        
  //     }
  // }

  useEffect(() => {
    AsyncStorage.getItem('loggedIn').then((isLoggedIn) => {
      console.log('isLoggedIn' , isLoggedIn)
      const jsonValue = isLoggedIn != null ? JSON.parse(isLoggedIn) : null;
        const timer = setTimeout(() => {
      if(!jsonValue)
        props.navigation.navigate('IntroSlides');
      else
        props.navigation.navigate('OnBoard');
    }, 3000);
    })

    return () => {
      clearTimeout(timer);
    }
  }, [])

  return (splash())
}

export default Splash;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  mainContainer : {
    flex: 1,
    position : 'relative'
  },  
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorContainer: {
    flex: 1,
    position : 'absolute',
    bottom : 20,
    width : Dimensions.get('screen').width
  }
})