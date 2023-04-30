import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import tw from 'twrnc';

const SignUp = () => {
  const navigation = useNavigation();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');

  return (
    <View style={tw`w-full h-full bg-[#7F73DB] `}>
      <View style={tw`w-full h-[15%], ['flex'] ,['flex-row'], ['justify-center'] ['items-center'] android:mt-12`}>
        <Text style={tw`w-full h-full font-bold text-[50px] text-white text-center`}>소솜</Text>
      </View>
      <View style={tw`w-full h-[5%]`}></View>
      <View style={tw`w-full flex flex-col justify-center items-center gap-3 p-3`}>
        <View style={tw`w-full flex flex-col gap-2`}>
          <Text style={tw`text-white font-semibold text-[12px]`}>아이디</Text>
          <View style={tw`flex flex-row w-full justify-center items-center gap-2`}>
            <TextInput
              style={tw`w-6/7 h-12 rounded-lg bg-white shadow-2xl shadow-[#352C74]`}
              value={id}
              onChange={(e) => {
                setId(e.nativeEvent.text);
              }}
            />
            <TouchableOpacity
              style={tw`bg-white h-12 w-12 rounded-xl flex flex-row justify-center items-center
            shadow-2xl shadow-[#352C74]
            `}>
              <Image source={require('../asset/finder.png')} style={tw`w-5 h-5`} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={tw`w-full flex flex-col gap-2`}>
          <Text style={tw`text-white font-semibold text-[12px]`}>비밀번호</Text>
          <TextInput
            style={tw`w-full h-12 rounded-lg bg-white shadow-2xl shadow-[#352C74]`}
            value={password}
            textContentType="password"
            onChange={(e) => {
              setPassword(e.nativeEvent.text);
            }}
          />
        </View>
        <View style={tw`w-full flex flex-col gap-2`}>
          <Text style={tw`text-white font-semibold text-[12px]`}>비밀번호 확인</Text>
          <TextInput
            style={tw`w-full h-12 rounded-lg bg-white shadow-2xl shadow-[#352C74]`}
            value={passwordCheck}
            textContentType="password"
            onChange={(e) => {
              setPasswordCheck(e.nativeEvent.text);
            }}
          />
        </View>
        <View style={tw`w-full flex flex-col gap-2`}>
          <Text style={tw`text-white font-semibold text-[12px]`}>닉네임</Text>
          <View style={tw`flex flex-row w-full justify-center items-center gap-2`}>
            <TextInput
              style={tw`w-6/7 h-12 rounded-lg bg-white shadow-2xl shadow-[#352C74]`}
              value={nickname}
              onChange={(e) => {
                setNickname(e.nativeEvent.text);
              }}
            />
            <TouchableOpacity
              style={tw`bg-white h-12 w-12 rounded-xl flex flex-row justify-center items-center
            shadow-2xl shadow-[#352C74]
            `}>
              <Image source={require('../asset/finder.png')} style={tw`w-5 h-5`} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={tw`w-full h-10 mt-10 flex flex-row justify-center items-center gap-5 p-3`}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={tw` w-1/2 h-12 flex flex-row justify-center items-center rounded-xl bg-[#352C74]`}>
            <Text style={tw`text-white`}>돌아가기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()} style={tw` w-1/2 h-12 flex flex-row justify-center items-center rounded-xl bg-[#352C74]`}>
            <Text style={tw`text-white`}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
