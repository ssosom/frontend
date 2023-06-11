import React from 'react';
import {TouchableOpacity, View} from 'react-native';

const RecodeFooter = () => {
  return (
    <View className="w-full flex justify-center items-center">
      <View className="w-full h-20 bg-[#262055] flex flex-row justify-center items-center" />
      <View className="w-24 bg-[#262055] h-24 rounded-full absolute bottom-0 flex justify-center items-center">
        <View className="w-20 bg-black h-20 rounded-full flex justify-center items-center">
          <TouchableOpacity className="w-10 h-10 bg-red-600 rounded-md" />
        </View>
      </View>
    </View>
  );
};

export default RecodeFooter;
