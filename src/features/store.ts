import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "./player.slice";

export const store = configureStore({
    reducer : {
        [playerSlice.name] : playerSlice.reducer
    }
})
export type RootState = ReturnType<typeof store.getState>