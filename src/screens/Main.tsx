import React, {useState, useEffect} from 'react';
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
import useRecord from '../store';

const audioRecorderPlayer = new AudioRecorderPlayer();

const MainScreen = () => {
  const {recordDuration, playerDuration, setPlayerDuration, setRecordDuration, setRecording} = useRecord();

  const dirs = RNFetchBlob.fs.dirs;
  const path = Platform.select({
    ios: 'hello.m4a',
    android: `${dirs.CacheDir}/hello.mp3`,
  });

  useEffect(() => {
    return () => {
      audioRecorderPlayer.removeRecordBackListener();
    };
  }, []);

  const startRecorder = async () => {
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    const result = await audioRecorderPlayer.startRecorder(path, audioSet);
    console.log(result);
    audioRecorderPlayer.addRecordBackListener((e) => {
      setRecordDuration({
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      });
      return;
    });
  };

  const recordPlay = async () => {
    const msg = await audioRecorderPlayer.startPlayer(path);
    //Volume should be set 0.0 to 1.0
    const volume = await audioRecorderPlayer.setVolume(1.0);
    audioRecorderPlayer.addPlayBackListener((e) => {
      setPlayerDuration({
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
      return;
    });
  };

  // 녹음 시작
  const requestPermission = async (permission: any, dialogOptions: any) => {
    try {
      const granted = await PermissionsAndroid.request(permission, dialogOptions);
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permission denied');
        return false;
      }
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const handleStartRecord = async () => {
    if (Platform.OS === 'android') {
      const grantedWrite = await requestPermission(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
        title: 'Permissions for write access',
        message: 'Give permission to your storage to write a file',
        buttonPositive: 'ok',
      });
      if (!grantedWrite) return;
      const grantedRecord = await requestPermission(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
        title: 'Permissions for write access',
        message: 'Give permission to your storage to write a file',
        buttonPositive: 'ok',
      });
      if (!grantedRecord) return;
    }
    startRecorder();
  };

  // 녹음 일시 중지
  const handlePauseRecord = async () => {
    try {
      const r = await audioRecorderPlayer.pauseRecorder();
      console.log(r);
    } catch (err) {
      console.log('pauseRecord', err);
    }
  };

  //녹음 종료
  const handleStopRecord = async (): Promise<void> => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordDuration({...recordDuration, recordSecs: 0});
    console.log(result);
  };
  // 재생 종료
  const onStopPlay = async (): Promise<void> => {
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  // 녹음 재시작
  const onResumeRecord = async (): Promise<void> => {
    await audioRecorderPlayer.resumeRecorder();
  };

  // 음성 재생
  const handleStartPlay = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.RECORD_AUDIO]);
        if (grants['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED && grants['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED) {
          await recordPlay();
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.log('startPlayer error', err);
      }
    } else {
      await recordPlay();
    }
  };

  return (
    <MainLayout>
      <View className="w-full h-[3%] flex justify-center items-end bg-[#7F73DB]" />
      <View className="w-full h-[97%] bg-white flex flex-col justify-center items-center">
        <View className="w-full h-[35%] border">
          <TouchableOpacity className="w-10 h-5 border" onPress={() => handleStartRecord()}>
            <Text>녹음</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-5 border" onPress={() => handleStopRecord()}>
            <Text>중지</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-5 border" onPress={() => handleStartPlay()}>
            <Text>재생</Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row justify-center items-center w-full h-[65%]">
          <View className="w-full h-full flex flex-col justify-start items-start bg-black">
            <Text className="w-full h-9 p-2 text-white font-bold bg-black">PlayList</Text>
          </View>
        </View>
      </View>
    </MainLayout>
  );
};

export default MainScreen;
