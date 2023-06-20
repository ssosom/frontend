import React, {FC, PropsWithChildren} from 'react';
import {SafeAreaView} from 'react-native';
import RecodeFooter from '../RecordFooter';

const MainLayout: FC<PropsWithChildren> = ({children}) => {
  return (
    <SafeAreaView className="bg-[#7F73DB] w-full h-full">
      {children}
      <RecodeFooter />
    </SafeAreaView>
  );
};

export default MainLayout;
