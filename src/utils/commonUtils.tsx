import {Platform} from 'react-native';

export const isAndriod = () => {
  if (Platform.OS === 'android') {
    return true;
  } else {
    return false;
  }
};
