import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  volume: 0.5,
  muted: false,
  looped: false,
  trackSrc: "/amcdd.mp3",
  isPlaying: false,
};
export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setVolume: (state, action) => {
      state.volume = action.payload.volume;
    },
    play: (state) => {
      state.isPlaying = true;
      document.querySelector("#audio-player").play();
    },
    pause: (state) => {
      document.querySelector("#audio-player").pause();
      state.isPlaying = false;
    },
    mute: (state, action) => {
      state.muted = action.payload.mute;
    },
    loop: (state, action) => {
      state.looped = action.payload.loop;
    },
    changeTrack: (state, action) => {
      setTimeout(() => {
        document.querySelector("#audio-player").play();
      }, 50);
      return (state = {
        isPlaying: true,
        trackSrc: action.payload.track,
      });
    },
  },
});

export const { setVolume, play, pause, mute, loop, changeTrack } =
  playerSlice.actions;
export default playerSlice.reducer;
