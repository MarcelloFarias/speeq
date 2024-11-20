import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISound } from "@/src/interfaces/interfaces";

const soundsSlice = createSlice({
  name: "sounds",
  initialState: {
    sounds: [] as ISound[],
  },
  reducers: {
    setSounds(state: any, action: PayloadAction<any>) {
      state.sounds = action.payload;
    },
  },
});

export const { setSounds } = soundsSlice.actions;

export const selectSounds = (state: any) => state.sounds.sounds;

const soundsReducer = soundsSlice.reducer;

export default soundsReducer;
