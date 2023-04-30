import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProps} from './Navigator';

const Entry = () => {
  const navigation = useNavigation<RootStackNavigationProps>();

  return (
    <View className="w-full h-full bg-[#7F73DB]">
      <View className="w-full h-[15%] flex flex-row justify-center items-center mt-24">
        <Text className="w-full h-full font-bold text-[50px] text-white text-center">소솜</Text>
      </View>
      <View className="w-full h-[40%]" />
      <View className="w-full h-[30%] flex flex-row justify-center items-center">
        <TouchableOpacity className="w-18 h-18 mr-8">
          <Image source={require('../assets/images/kakao.png')} />
        </TouchableOpacity>
        <TouchableOpacity className="w-18 h-18 mr-8">
          <Image source={require('../assets/images/naver.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')} className="w-18 h-18">
          <Image source={require('../assets/images/user.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Entry;
