import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItemInAsync = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (err) {
    console.log(err);
  }
};

export const getItemInAsync = async (key: string) => {
  try {
    const item = await AsyncStorage.getItem(key);
    return item;
  } catch (err) {
    console.log(err);
  }
};
