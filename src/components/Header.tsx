import {View, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import tw from 'twrnc';

const Header = () => {
  const {top} = useSafeAreaInsets();

  return (
    <>
      <View style={tw`h-[${top}] bg-[#7F73DB]`} />
      <StatusBar backgroundColor="#7F73DB" />
    </>
  );
};

export default Header;
