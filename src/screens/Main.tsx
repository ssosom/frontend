import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import MainLayout from '../components/Layout/MainLayout';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  OutputFormatAndroidType,
  AudioSet,
  PlayBackType,
  RecordBackType,
} from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';
import {PermissionsAndroid} from 'react-native';
import {Platform} from 'react-native';

const audioRecorderPlayer = new AudioRecorderPlayer();

const MainScreen = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(0);
  const [playTime, setPlayTime] = useState('00:00:00');
  const [duration, setDuration] = useState('00:00:00');

  const dirs = RNFetchBlob.fs.dirs;
  const path = Platform.select({
    ios: undefined,
    android: undefined,
  });

  // 녹음 시작
  const handleStartRecord = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        console.log('write external stroage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('permissions granted');
        } else {
          console.log('All required permissions not granted');

          return;
        }
      } catch (err) {
        console.warn(err);

        return;
      }
    }
  };

  // 녹음 중지
  const handleStopRecord = async () => {
    try {
      const r = await audioRecorderPlayer.pauseRecorder();
      console.log(r);
    } catch (err) {
      console.log('pauseRecord', err);
    }
  };

  const onStopRecord = async (): Promise<void> => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordSecs(0);
    console.log(result);
  };

  const onResumeRecord = async (): Promise<void> => {
    await audioRecorderPlayer.resumeRecorder();
  };

  // 음성 재생
  const soundStart = async () => {
    try {
      const msg = await audioRecorderPlayer.startPlayer(path);

      const volume = await audioRecorderPlayer.setVolume(1.0);
      console.log(`path: ${msg}`, `volume: ${volume}`);

      audioRecorderPlayer.addPlayBackListener((e: PlayBackType) => {
        console.log('playBackListener', e);
        setCurrentPositionSec(e.currentPosition);
        setCurrentDurationSec(e.duration);
        setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
        setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
      });
    } catch (err) {
      console.log('startPlayer error', err);
    }
  };

  const onPausePlay = async (): Promise<void> => {
    await audioRecorderPlayer.pausePlayer();
  };

  const onResumePlay = async (): Promise<void> => {
    await audioRecorderPlayer.resumePlayer();
  };

  const onStopPlay = async (): Promise<void> => {
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  return (
    <MainLayout>
      <View className="w-full h-5 flex justify-center items-end pr-3 bg-[#7F73DB]" />
      <View className="w-full h-[90%] bg-white">
        <View className="w-full h-[60%]" />
        <View className="flex flex-row justify-center items-center gap-5">
          <TouchableOpacity className="w-10 h-5 border" onPress={() => handleStartRecord()}>
            <Text>녹음</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-5 border" onPress={() => handleStopRecord()}>
            <Text>중지</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-5 border" onPress={() => soundStart()}>
            <Text>재생</Text>
          </TouchableOpacity>
          {/* <Text>{recordDuration.recordSecs}</Text>
          <Text>{recordDuration.recordTime}</Text> */}
        </View>
      </View>
    </MainLayout>
  );
};

export default MainScreen;
