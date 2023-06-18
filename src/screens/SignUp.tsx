import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Image, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {checkDuplicatedNickname, checkDuplicatedEmail, signUp} from '../axios';
import {RootStackNavigationProps} from './Navigator';

const SignUp = () => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const [id, setId] = useState('');
  const duplicatedCheck = [false, false];
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');

  const handleCheckDuplicateEmail = async () => {
    const response = await checkDuplicatedEmail(id);
    if (!response) {
      Alert.alert('사용 가능한 이메일입니다.');
      duplicatedCheck.splice(0, 1, true);
      return;
    } else if (response) {
      Alert.alert('중복된 이메일입니다. 다른 이메일을 입력해주세요.');
    }
  };

  const handleCheckDuplicateNickName = async () => {
    const response = await checkDuplicatedNickname(nickname);
    if (!response) {
      Alert.alert('사용 가능한 닉네임입니다.');
      duplicatedCheck.splice(1, 1, true);
      return;
    } else if (response) {
      Alert.alert('중복된 닉네임입니다. 다른 닉네임을 입력해주세요.');
      return;
    }
  };

  const handleSignUp = async () => {
    if (password !== passwordCheck) {
      Alert.alert('비밀번호가 일치하지 않습니다.');
      return;
    } else if (duplicatedCheck[0] === false) {
      Alert.alert('이메일 중복확인을 해주세요.');
      return;
    } else if (duplicatedCheck[1] === false) {
      Alert.alert('닉네임 중복확인을 해주세요.');
      return;
    }
    const response = await signUp(id, password, nickname);
    if (response) {
      Alert.alert('회원가입이 완료되었습니다.');
      navigation.navigate('SignIn');
    }
  };

  return (
    <View className="w-full h-full bg-[#7F73DB]">
      <View className="w-full h-[15%] flex flex-row justify-center items-center mt-12">
        <Text className="w-full h-full font-bold text-[50px] text-white text-center">소솜</Text>
      </View>
      <View className="w-full flex flex-col justify-center items-center gap-3 p-3">
        <View className="w-full flex flex-col gap-2">
          <Text className="text-white font-semibold text-[12px]">아이디</Text>
          <View className="flex flex-row w-full justify-center items-center gap-1">
            <TextInput
              className="w-5/6 h-12 rounded-lg bg-white shadow-2xl shadow-[#352C74] pl-2"
              value={id}
              onChange={(e) => {
                setId(e.nativeEvent.text);
              }}
            />
            <TouchableOpacity
              className="bg-white h-12 w-1/6 rounded-xl flex flex-row justify-center items-center
            shadow-2xl shadow-[#352C74]
            "
              onPress={() => handleCheckDuplicateEmail()}>
              <Image source={require('../../assets/images/finder.png')} className="w-5 h-5" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="w-full flex flex-col gap-2">
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
        <View className="w-full flex flex-col gap-2">
          <Text className="text-white font-semibold text-[12px]">비밀번호 확인</Text>
          <TextInput
            className="w-full h-12 rounded-lg bg-white shadow-2xl shadow-[#352C74] pl-2"
            value={passwordCheck}
            secureTextEntry
            onChange={(e) => {
              setPasswordCheck(e.nativeEvent.text);
            }}
          />
        </View>
        <View className="w-full flex flex-col gap-2 mb-10">
          <Text className="text-white font-semibold text-[12px]">닉네임</Text>
          <View className="flex flex-row w-full justify-center items-center gap-1">
            <TextInput
              className="w-5/6 h-12 rounded-lg bg-white shadow-2xl shadow-[#352C74] pl-2"
              value={nickname}
              onChange={(e) => {
                setNickname(e.nativeEvent.text);
              }}
            />
            <TouchableOpacity
              className="bg-white h-12 w-1/6 rounded-xl flex flex-row justify-center items-center
            shadow-2xl shadow-[#352C74]
            "
              onPress={() => handleCheckDuplicateNickName()}>
              <Image source={require('../../assets/images/finder.png')} className="w-5 h-5" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="w-full h-10  flex flex-row justify-center items-center gap-5 p-2">
          <TouchableOpacity onPress={() => navigation.goBack()} className=" w-1/2 h-12 flex flex-row justify-center items-center rounded-xl bg-[#352C74]">
            <Text className="text-white">돌아가기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSignUp()} className=" w-1/2 h-12 flex flex-row justify-center items-center rounded-xl bg-[#352C74]">
            <Text className="text-white">회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
