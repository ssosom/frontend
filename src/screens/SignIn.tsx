import React from 'react';
import {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProps} from './Navigator';
import {signIn} from '../axios';
import {Image} from 'react-native';
import {setItemInAsync} from '../utils/authUtils';

const SignIn = () => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const response: LoginResponse = await signIn(id, password);
    if (response) {
      setItemInAsync('accessToken', response.accessToken);
      setItemInAsync('refreshToken', response.refreshToken);
    }
    navigation.navigate('Main');
  };

  return (
    <View className="w-full h-full bg-[#7F73DB] font-GabiaHeuldot">
      <View className="w-full h-40 flex flex-row justify-center items-center mt-14">
        <Image source={require('../assets/images/sosomWhite.png')} className="w-full h-full" />
      </View>
      <View className="w-full h-[5%]" />
      <View className="w-full flex flex-col justify-center items-center gap-3 p-3">
        <View className="w-full flex flex-col gap-2">
          <Text className="text-white font-semibold text-[12px]">아이디</Text>
          <TextInput
            className="w-full h-12 rounded-lg bg-white shadow-2xl shadow-[#352C74] pl-2"
            value={id}
            onChange={(e) => {
              setId(e.nativeEvent.text);
            }}
          />
        </View>
        <View className="w-full flex-col gap-2">
          <Text className="text-white font-semibold text-[12px]">비밀번호</Text>
          <TextInput
            className="w-full h-12 rounded-lg bg-white shadow-2xl shadow-[#352C74] pl-2"
            value={password}
            secureTextEntry
            onChange={(e) => {
              setPassword(e.nativeEvent.text);
            }}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} className="mt-3 text-center flex flex-row justify-center items-center">
          <Text className="text-white">아직 회원이 아니시라면?</Text>
        </TouchableOpacity>
        <View className="w-full h-10 mt-10 flex flex-row justify-center items-center gap-5 p-3">
          <TouchableOpacity onPress={() => navigation.goBack()} className=" w-1/2 h-12 flex flex-row justify-center items-center rounded-xl bg-[#352C74]">
            <Text className="font-semibold text-white">돌아가기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLogin()} className=" w-1/2 h-12 flex flex-row justify-center items-center rounded-xl bg-[#352C74]">
            <Text className="font-semibold text-white">로그인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
