import { StyleSheet, Text, View, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';

import Logo from '../../assets/Logo.svg';


const Screen = (props) => {
  const { width, height } = Dimensions.get('window');

  const { title, description, image } = props;
  return (
    <LinearGradient colors={['#FDD7CB', '#fff']} style={{ width, height, ...styles.linearGradient }}>
      <View style={styles.screenContainer}>
        <View style={styles.logoContainer}>
          {title && <Logo />}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <View style={styles.descContainer}>
          <Text style={styles.descText}>{description}</Text>
        </View>
        <View style={styles.imgContainer}>
          {image}
        </View>
      </View>
    </LinearGradient>
  )
}

export default Screen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  screenContainer: {
    padding: 30,
    display: 'flex',
    flex: 1,
  },
  titleText: {
    fontSize: 40,
    color: '#F96E46',
    fontFamily: 'JosefinSans-Bold'
  },
  logoContainer: {
    flex: 1,
  }
  ,
  textContainer: {
    height : 'auto',
    paddingTop : 30
  },
  descContainer: {
    flex: 1,
    fontSize: 16,
    marginTop: 20,
  },
  descText: {
    color: '#8F8F8F'
  },
  imgContainer: {
    flex: 2,
  }
})