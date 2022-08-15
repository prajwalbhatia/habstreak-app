import { StyleSheet, Text, View, StatusBar, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import React, { useState } from 'react';

//Components
import Screen from "./Screen";

//IMAGES
import Screen1 from '../../assets/screen1.svg';
import Screen2 from '../../assets/screen2.svg';
import Screen3 from '../../assets/screen3.svg';

const screensList = [{
  title: 'Get things done and rewards yourself',
  description: 'Are you tired of starting the things and dropping in between??? Not anymore, try habstreak, record your task and reward yourself on reaching milestones.',
  image: <Screen1 />
},
{
  title: 'Reward yourself and make the road of success exciting',
  description: 'Most good things take time and alot of effort, so why only wait for the end result?? Reward youself on small success and make your journey more exciting.',
  image: <Screen2 />
},
{
  title: 'Enjoying the process is important',
  description: 'Take baby steps daily to complete the impossible looking tasks and make impossible task says I M POSSIBLE.',
  image: <Screen3 />
},
{}
]

const IntroSlides = (props) => {
  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  const { width } = Dimensions.get('window');

  const setSliderPage = (event) => {
    const { currentPage } = sliderState;
    
    
      const { x } = event.nativeEvent.contentOffset;
      const indexOfNextScreen = Math.floor(x / width);


    if (currentPage === screensList.length - 2 && indexOfNextScreen === screensList.length - 1) {
      props.navigation.navigate('OnBoard');
    }
    else
    {
      if (indexOfNextScreen !== currentPage) {
        setSliderState({
          ...sliderState,
          currentPage: indexOfNextScreen,
        });
      }
    }
  };

  const renderScreen = () => {
    return screensList.map((screen, index) => {
      return (
        <View key={index}>
          <Screen
            index={index}
            title={screen.title}
            description={screen.description}
            image={screen.image}
          />
        </View>
      )
    })
  }

  const { currentPage: pageIndex } = sliderState;

  return (
    <>
      {/* <StatusBar barStyle="dark-content" /> */}
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            setSliderPage(event);
          }}
        >
          {renderScreen()}
        </ScrollView>

        <View style={styles.paginationWrapper}>
          {Array.from(Array(screensList.length - 1).keys()).map((key, index) => (
            <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
          ))}
        </View>
      </SafeAreaView>
    </>
  )
}

export default IntroSlides;

const styles = StyleSheet.create({
  paginationWrapper: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#0898A0',
    marginLeft: 10,
  },
})