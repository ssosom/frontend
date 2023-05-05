import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigator from './screens/Navigator';
import Header from './components/Header';

const App = () => {
  return (
    <SafeAreaProvider>
      <Header />
      <Navigator />
    </SafeAreaProvider>
  );
};

export default App;
