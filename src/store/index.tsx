import {create} from 'zustand';

const useStore = create<StoreState & StoreActions>((set) => ({
  recordDuration: {
    recordSecs: 0,
    recordTime: '00:00:00',
  },
  playerDuration: {
    currentPositionSec: 0,
    currentDurationSec: 0,
    playTime: '00:00:00',
    duration: '00:00:00',
  },
  recording: false,
  setRecordDuration: (newRecordDuration) =>
    set((state) => ({
      recordDuration: {
        ...state.recordDuration,
        ...newRecordDuration,
      },
    })),
  setPlayerDuration: (newPlayerDuration) =>
    set((state) => ({
      playerDuration: {
        ...state.playerDuration,
        ...newPlayerDuration,
      },
    })),
  setRecording: (newRecording) => set({recording: newRecording}),
}));

export default useStore;
