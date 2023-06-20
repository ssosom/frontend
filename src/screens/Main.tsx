import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import MainLayout from '../components/Layout/MainLayout';
import AudioRecorderPlayer, {AVEncoderAudioQualityIOSType, AVEncodingOption, AudioEncoderAndroidType, AudioSet, AudioSourceAndroidType} from 'react-native-audio-recorder-player';

const MainScreen = () => {
  const audioRecorderPlayer = new AudioRecorderPlayer();
  const [recoding, setRecoding] = useState<boolean>(false);
  const [playerDuration, setPlayerDuration] = useState<any>('');

  const onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener((e) => {
      setRecoding(true);
      setPlayerDuration({
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      });
      return;
    });
    console.log(result);
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecoding(false);
    // setState({
    //   recordSecs: 0,
    // });
    console.log(result);
  };

  const onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await audioRecorderPlayer.startPlayer();
    console.log(msg);
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

  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
  };

  const onStopPlay = async () => {
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  return (
    <MainLayout>
      <View className={`w-full h-5 flex justify-center items-end pr-3 bg-[#7F73DB]`}></View>
      <View className="w-full h-[90%] bg-white">
        <View className="w-full h-[60%]"></View>
        <TouchableOpacity className="w-10 h-5 border" onPress={() => onStartRecord()}>
          <Text>녹음</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
};

export default MainScreen;
