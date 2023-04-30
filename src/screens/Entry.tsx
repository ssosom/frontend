import {View, Text, TouchableOpacity, Image} from 'react-native';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';

const Entry = () => {
  const navigation = useNavigation();

  return (
    <View style={tw`w-full h-full bg-[#7F73DB]`}>
      <View style={tw`w-full h-[15%], ['flex'] ,['flex-row'], ['justify-center'] ['items-center'] android:mt-12`}>
        <Text style={tw`w-full h-full font-bold text-[50px] text-white text-center`}>소솜</Text>
      </View>
      <View style={tw`w-full h-[50%]`}></View>
      <View style={tw`w-full h-[30%] flex flex-row justify-center items-center gap-10`}>
        <TouchableOpacity>
          <Image source={require('../asset/kakao.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../asset/naver.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Image source={require('../asset/user.png')}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Entry;
