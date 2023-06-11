import React from 'react';
import {View, Text} from 'react-native';
import {isAndriod} from '../utils/commonUtils';
import RecodeFooter from '../components/RecordFooter';

const MainScreen = () => {
  return (
    <View className="w-full h-full">
      <View className={`${!isAndriod() && 'mt-5'} w-full h-10 flex justify-center items-end pr-3 bg-[#262055]`}>
        <Text className="text-white font-semibold">USER NICKNAME</Text>
      </View>
      <View className="w-full h-[30%] border"></View>
      <View className="w-full h-[50%] border"></View>
      <RecodeFooter />
    </View>
  );
};

export default MainScreen;
