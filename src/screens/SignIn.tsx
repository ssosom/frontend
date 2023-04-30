import React from 'react';
import {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProps} from './Navigator';

const SignIn = () => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View className="w-full h-full bg-[#7F73DB]">
      <View className="w-full h-[15%] flex flex-row justify-center items-center android:mt-12">
        <Text className="w-full h-full font-bold text-[50px] text-white text-center">소솜</Text>
      </View>
      <View className="w-full h-[10%]" />
      <View className="w-full flex flex-col justify-center items-center gap-3 p-3">
        <View className="w-full flex flex-col gap-2">
          <Text className="text-white font-semibold text-[12px]">아이디</Text>
          <TextInput
            className="w-full h-12 rounded-lg bg-white shadow-2xl shadow-[#352C74]"
            value={id}
            onChange={(e) => {
              setId(e.nativeEvent.text);
            }}
          />
        </View>
        <View className="w-full flex-col gap-2">
          <Text className="text-white font-semibold text-[12px]">비밀번호</Text>
          <TextInput
            className="w-full h-12 rounded-lg bg-white shadow-2xl shadow-[#352C74]"
            value={password}
            onChange={(e) => {
              setPassword(e.nativeEvent.text);
            }}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} className="mt-3">
          <Text className="text-white font-semibold">아직 회원이 아니시라면?</Text>
        </TouchableOpacity>
        <View className="w-full h-10 mt-10 flex flex-row justify-center items-center gap-5 p-3">
          <TouchableOpacity onPress={() => navigation.goBack()} className=" w-1/2 h-12 flex flex-row justify-center items-center rounded-xl bg-[#352C74]">
            <Text className="font-semibold text-white">돌아가기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} className=" w-1/2 h-12 flex flex-row justify-center items-center rounded-xl bg-[#352C74]">
            <Text className="font-semibold text-white">로그인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
