import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Splash from './Splash';
import Main from './Main';
import Login from './SignIn';
import SignUp from './SignUp';
import Entry from './Entry';

export type RootStackParamList = {
  Entry: undefined;
  SignIn: undefined;
  Splash: undefined;
  SignUp: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator();
const {Screen} = Stack;

export type RootStackNavigationProps = NativeStackNavigationProp<RootStackParamList>;

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Entry">
        <Screen name="Entry" component={Entry} options={{headerShown: false}} />
        <Screen name="SignIn" component={Login} options={{headerShown: false}} />
        <Screen name="Splash" component={Splash} options={{headerShown: false}} />
        <Screen name="SignUp" component={SignUp} options={{headerShown: false}} />
        <Screen name="Main" component={Main} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
