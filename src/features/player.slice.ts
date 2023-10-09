import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dataSong from "../dataSong";

interface ISong {
    id: number;
    name: string;
    url: string;
    brand: string;
    image: string;
}

interface IPlayerState {
    songs: ISong[];
    currentSong: ISong ;
    suffle: boolean;
    repeat: boolean;
    playing: boolean;
    volume: number;

}
const initialState: IPlayerState = {
    songs: dataSong,
    currentSong: dataSong[0],
    suffle: false,
    repeat: false,
    playing:false,
    volume: 1,
}

const playerSlice = createSlice({
    name:"player",
    initialState,
    reducers: {
        togglePlay(state){
            state.playing = !state.playing
        },
        nextPlayer(state) {
           const idCurrentSong = state.currentSong.id; 
           const indexCurrentSong = state.songs.findIndex((song) => song.id === idCurrentSong)
           if ( indexCurrentSong === state.songs.length - 1) {
                //randomm id song
                if(state.suffle) {
                    const idRandom = Math.floor(Math.random() * ((state.songs.length-1))) 
                    state.currentSong = state.songs[idRandom]
                } else {
                    state.currentSong = state.songs[0]
                }
           } else {
            if(state.suffle) {
                const idRandom = Math.floor(Math.random() * ((state.songs.length-1))) 
                state.currentSong = state.songs[idRandom]
            } else {
                state.currentSong = state.songs[ indexCurrentSong + 1]
            }
           }
        },
        prevPlayer(state) {
            const idCurrentSong = state.currentSong.id; 
            const indexCurrentSong = state.songs.findIndex((song) => song.id === idCurrentSong)
            if ( indexCurrentSong === 0) {
             state.currentSong = state.songs[state.songs.length - 1]
            } else {
             state.currentSong = state.songs[ indexCurrentSong -1]
            }
        },
        toggleRepeat(state){
            state.repeat = !state.repeat;
            if(state.repeat){
                state.suffle = false
            }
        },
        toggleSuffle(state){
            state.suffle =!state.suffle;
            if (state.suffle) {
                state.repeat = false
            }
        },
        setVolume(state, action: PayloadAction<number>){
            state.volume = action.payload
        },
        chooseSong(state, action: PayloadAction<number>){
            state.currentSong = state.songs[action.payload]
        }
    }
});
export const {togglePlay, nextPlayer, prevPlayer, toggleRepeat, toggleSuffle, setVolume, chooseSong} = playerSlice.actions
export default playerSlice;