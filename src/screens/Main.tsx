import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import MainLayout from '../components/Layout/MainLayout';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

const MainScreen = () => {
  const [recordDuration, setRecordDuration] = useState({
    recordSecs: 0,
    recordTime: '00:00:00',
  });
  const [playerDuration, setPlayerDuration] = useState({
    currentPositionSec: 0,
    currentDurationSec: 0,
    playTime: '00:00:00',
    duration: '00:00:00',
  });
  const [recording, setRecording] = useState(false);

  // 녹음 시작
  const handleStartRecord = async () => {
    if (audioRecorderPlayer) {
      setRecording(true);
      setPlayerDuration({
        ...playerDuration,
        currentPositionSec: 0,
        currentDurationSec: 0,
        playTime: '00:00:00',
        duration: '00:00:00',
      });
      await audioRecorderPlayer.startRecorder();
    }
    audioRecorderPlayer.addRecordBackListener((e) => {
      setRecordDuration({
        ...recordDuration,
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      });
    });
  };

  // 녹음 중지
  const handleStopRecord = async () => {
    if (audioRecorderPlayer) {
      setRecording(false);
      await audioRecorderPlayer.stopRecorder();
    }
    audioRecorderPlayer.removeRecordBackListener();
    setRecordDuration({...recordDuration, recordSecs: 0});
  };

  // 음성 재생
  const soundStart = async () => {
    await audioRecorderPlayer.startPlayer();
    audioRecorderPlayer.addPlayBackListener((e) => {
      setPlayerDuration({
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
    });
  };

  return (
    <MainLayout>
      <View className={`w-full h-5 flex justify-center items-end pr-3 bg-[#7F73DB]`}></View>
      <View className="w-full h-[90%] bg-white">
        <View className="w-full h-[60%]"></View>
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
          <Text>{recordDuration.recordSecs}</Text>
          <Text>{recordDuration.recordTime}</Text>
        </View>
      </View>
    </MainLayout>
  );
};

export default MainScreen;
