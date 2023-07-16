interface RecordDuration {
  recordSecs: number;
  recordTime: string;
}

interface PlayerDuration {
  currentPositionSec: number;
  currentDurationSec: number;
  playTime: string;
  duration: string;
}

interface StoreState {
  recordDuration: RecordDuration;
  playerDuration: PlayerDuration;
  recording: boolean;
}

interface StoreActions {
  setRecordDuration: (newRecordDuration: Partial<RecordDuration>) => void;
  setPlayerDuration: (newPlayerDuration: Partial<PlayerDuration>) => void;
  setRecording: (newRecording: boolean) => void;
}
