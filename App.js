import React from 'react';

import {
  StyleSheet,
  StatusBar
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//SCREENS
import Splash from './pages/Splash/Splash';
import OnBoard from './pages/OnBoard/OnBoard';
import IntroSlides from './pages/IntroSlides/IntroSlides';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#F96E46"
        hidden={false}
      />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="">
          <Stack.Screen name="Splash" options={{ headerShown: false }}>
            {(propss) => <Splash {...{ ...propss }} />}
          </Stack.Screen>

          <Stack.Screen name="IntroSlides" options={{ headerShown: false }}>
            {(propss) => <IntroSlides {...{ ...propss }} />}
          </Stack.Screen>

          <Stack.Screen name="OnBoard" options={{ headerShown: false }}>
            {(propss) => <OnBoard {...{ ...propss }} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({

});

export default App;
