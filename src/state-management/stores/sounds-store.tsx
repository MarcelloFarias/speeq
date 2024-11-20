import { configureStore } from "@reduxjs/toolkit";
import soundsReducer from "@/src/state-management/slices/sounds-slice";

export const store = configureStore({
  reducer: {
    sounds: soundsReducer,
  },
});
