import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://54.180.124.206',
  withCredentials: false,
});

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
