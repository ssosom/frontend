import {useCallback, useEffect, useState} from 'react';
import AudioRecorderPlayer, {AVEncoderAudioQualityIOSType, AVEncodingOption, AudioEncoderAndroidType, AudioSourceAndroidType} from 'react-native-audio-recorder-player';
import {PermissionsAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {Platform} from 'react-native';
import useRecordState from '../store';

export const useRecord = () => {
  const audioRecorderPlayer = new AudioRecorderPlayer();
  audioRecorderPlayer.setSubscriptionDuration(0.09);
  const {recordDuration, playerDuration, setPlayerDuration, setRecordDuration, setRecording} = useRecordState();
  const [savedFilePath, setSavedFilePath] = useState('');
  const dirs = RNFetchBlob.fs.dirs;
  const path = Platform.select({
    ios: 'hello.m4a',
    android: `${dirs.CacheDir}/hello.mp3`,
  });

  useEffect(() => {
    return () => {
      audioRecorderPlayer.removeRecordBackListener();
      audioRecorderPlayer.removePlayBackListener();
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
    setSavedFilePath(result);
    audioRecorderPlayer.addRecordBackListener((e) => {
      setRecordDuration({
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      });
      return;
    });
  };

  // 녹음 시작
  const requestPermission = useCallback(async (permission: any, dialogOptions: any) => {
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
  }, []);

  const handleStartRecord = useCallback(async () => {
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
  }, []);

  // 녹음 일시 중지
  const handlePauseRecord = useCallback(async () => {
    try {
      const r = await audioRecorderPlayer.pauseRecorder();
      console.log(r);
    } catch (err) {
      console.log('pauseRecord', err);
    }
  }, []);

  //녹음 종료
  const handleStopRecord = useCallback(async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordDuration({...recordDuration, recordSecs: 0});
    console.log(result);
  }, []);
  // 재생 종료
  const onStopPlay = useCallback(async () => {
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  }, []);

  // 녹음 재시작
  const onResumeRecord = useCallback(async () => {
    await audioRecorderPlayer.resumeRecorder();
  }, []);

  // 음성 재생
  const handleStartPlay = useCallback(async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.RECORD_AUDIO]);
        if (grants['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED && grants['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED) {
          const msg = await audioRecorderPlayer.startPlayer(savedFilePath);
          audioRecorderPlayer.setVolume(1.0);
          audioRecorderPlayer.addPlayBackListener((e) => {
            if (e.currentPosition === e.duration) {
              audioRecorderPlayer.stopPlayer();
            }
            setPlayerDuration({
              currentPositionSec: e.currentPosition,
              currentDurationSec: e.duration,
              playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
              duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
            });
          });
        } else {
          console.log('All required permissions not granted');
        }
      } catch (err) {
        console.log('startPlayer error', err);
      }
    } else {
      const msg = await audioRecorderPlayer.startPlayer(path);
      audioRecorderPlayer.setVolume(1.0);
      audioRecorderPlayer.addPlayBackListener((e) => {
        if (e.currentPosition === e.duration) {
          audioRecorderPlayer.stopPlayer();
        }
        setPlayerDuration({
          currentPositionSec: e.currentPosition,
          currentDurationSec: e.duration,
          playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
          duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
        });
      });
    }
  }, []);

  return {
    recordDuration,
    playerDuration,
    startRecorder,
    requestPermission,
    handleStartRecord,
    handlePauseRecord,
    handleStopRecord,
    onStopPlay,
    onResumeRecord,
    handleStartPlay,
  };
};
