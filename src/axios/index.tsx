import AsyncStorage from '@react-native-async-storage/async-storage';
import {setItemInAsync} from '../utils/authUtils';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://54.180.124.206',
  withCredentials: false,
});

instance.interceptors.request.use(
  async (req) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (req.headers && accessToken !== null) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }
    return req;
  },
  (err) => {
    return Promise.reject(err);
  },
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const originalRequest = error.config;
    const accessToken = await AsyncStorage.getItem('accessToken');
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (error.response.status === 401 && error.response.data === 'ExpiredDate') {
      const result = await instance.put('/api/refresh', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          refresh: `${refreshToken}`,
        },
      });
      setItemInAsync('accessToken', result.data.accessToken);
      setItemInAsync('refreshToken', result.data.refreshToken);
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  },
);

export const duplicatedNickname = async (nickname: string) => {
  return await instance
    .get(`/api/members/nicknames?nickname=${nickname}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const duplicatedEmail = async (email: string) => {
  return await instance
    .get(`/api/members/emails?email=${email}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signUp = async (email: string, password: string, nickname: string) => {
  return await instance
    .post('/api/members', {
      email: email,
      password: password,
      nickname: nickname,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signIn = async (email: string, password: string) => {
  return await instance
    .post('/api/login', {
      email: email,
      password: password,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
