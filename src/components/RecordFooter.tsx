import React from 'react';
import {TouchableOpacity, View} from 'react-native';

const RecodeFooter = () => {
  return (
    <View className="w-full flex justify-center items-center absolute bottom-0">
      <View className="w-full h-16 bg-[#7F73DB] flex flex-row justify-center items-center" />
      <View className="w-20 bg-[#7F73DB] h-20 rounded-full absolute bottom-0 flex justify-center items-center">
        <View className="w-16 bg-black h-16 rounded-full flex justify-center items-center">
          <TouchableOpacity className="w-8 h-8 bg-red-600 rounded-md" />
        </View>
      </View>
    </View>
  );
};

export default RecodeFooter;
