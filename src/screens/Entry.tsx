import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProps} from './Navigator';
import Kakao from '../assets/images/kakao';
import User from '../assets/images/User';
import Naver from '../assets/images/Naver';
import * as KakaoLogins from '@react-native-seoul/kakao-login';

const Entry = () => {
  const navigation = useNavigation<RootStackNavigationProps>();

  const handleKakaoLogin = () => {
    KakaoLogins.login().then((result) => {
      console.log(result);
    });
  };

  return (
    <View className="w-full h-full bg-[#7F73DB]">
      <View className="w-full h-[15%] flex flex-row justify-center items-center mt-24">
        <Text className="w-full h-full font-bold text-[50px] text-white text-center">소솜</Text>
      </View>
      <View className="w-full h-[40%]" />
      <View className="w-full h-[30%] flex flex-row justify-center items-center">
        <TouchableOpacity className="w-18 h-18" onPress={() => handleKakaoLogin()}>
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
