import React from 'react';
import {View, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Header = () => {
  const {top} = useSafeAreaInsets();

  return (
    <>
      <View className={`h-[${top}] bg-[#7F73DB]`} />
      <StatusBar backgroundColor="#7F73DB" />
    </>
  );
};

export default Header;
