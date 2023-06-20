import React from 'react';
import {View, TouchableOpacity, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProps} from './Navigator';
import Kakao from '../assets/images/kakao';
import User from '../assets/images/User';
import Naver from '../assets/images/Naver';
// import * as KakaoLogins from '@react-native-seoul/kakao-login';
import {Image} from 'react-native';

const Entry = () => {
  const navigation = useNavigation<RootStackNavigationProps>();

  // const handleKakaoLogin = () => {
  //   KakaoLogins.login().then((result) => {
  //     console.log(result);
  //   });
  // };

  return (
    
      <View className="w-full h-full bg-[#7F73DB] flex flex-col justify-center items-center">
        <View className="w-full h-[36%] flex flex-row justify-center items-center my-20">
          <Image source={require('../assets/images/sosomWhite.png')} className="w-[60%] h-full" />
        </View>
        <View className="w-full h-[30%] flex flex-row justify-center items-center">
          <TouchableOpacity className="w-18 h-18">
            <Kakao />
          </TouchableOpacity>
          <TouchableOpacity className="w-18 h-18 ml-8 mr-8">
            <Naver />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')} className="w-18 h-18">
            <User />
          </TouchableOpacity>
        </View>
      </View>
    
  );
};

export default Entry;
