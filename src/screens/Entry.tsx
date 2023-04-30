import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProps} from './Navigator';

const Entry = () => {
  const navigation = useNavigation<RootStackNavigationProps>();

  return (
    <View className="w-full h-full bg-[#7F73DB]">
      <View className="w-full h-[15%] flex flex-row justify-center items-center android:mt-12">
        <Text className="w-full h-full font-bold text-[50px] text-white text-center">소솜</Text>
      </View>
      <View className="w-full h-[50%]" />
      <View className="w-full h-[30%] flex flex-row justify-center items-center gap-10">
        <TouchableOpacity>
          <Image source={require('../asset/kakao.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../asset/naver.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Image source={require('../asset/user.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Entry;
