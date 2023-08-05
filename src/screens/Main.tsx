import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import MainLayout from '../components/Layout/MainLayout';
import {useRecord} from '../hooks/useRecord';

const MainScreen = () => {
  const {handleStartRecord, handleStopRecord, handleStartPlay} = useRecord();

  return (
    <MainLayout>
      <View className="w-full h-[3%] flex justify-center items-end bg-[#7F73DB]" />
      <View className="w-full h-[97%] bg-white flex flex-col justify-center items-center">
        <View className="w-full h-[35%] border">
          <TouchableOpacity className="w-10 h-5 border" onPress={() => handleStartRecord()}>
            <Text>녹음</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-5 border" onPress={() => handleStopRecord()}>
            <Text>중지</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-5 border" onPress={() => handleStartPlay()}>
            <Text>재생</Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row justify-center items-center w-full h-[65%]">
          <View className="w-full h-full flex flex-col justify-start items-start bg-black">
            <Text className="w-full h-9 p-2 text-white font-bold bg-black">PlayList</Text>
          </View>
        </View>
      </View>
    </MainLayout>
  );
};

export default MainScreen;
