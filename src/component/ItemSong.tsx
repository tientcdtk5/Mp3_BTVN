
import IconPlay from "../assets/iconplaying.gif"
import { useState, useEffect } from "react"
import { chooseSong } from "../features/player.slice"
import { useDispatch } from "react-redux"

interface Song {
    id:number;
    name:string;
    url:string;
    brand:string;
    image:string;
};

interface IStateActive {
    active: boolean;
    play: boolean;
}

export default function ItemSong({song, stateActive} : {song: Song, stateActive: IStateActive}) {
    const dispatch = useDispatch()
    const [stateDuration, setStateDuration] = useState("00:00")

    const audioElement = new Audio(song.url);

    useEffect(()=> {
        audioElement.addEventListener("loadedmetadata", () => {
            const minutes = Math.floor( audioElement.duration / 60 )
            const second = Math.floor( audioElement.duration % 60)
            const timeSong = minutes.toString().padStart(2, "0") + " : " 
            + second.toString().padStart(2,"0")
            setStateDuration(timeSong)
        })
    }, [stateDuration]);
    return (
        <div className={"item-song " + (stateActive.active ? "active_item-song" : "")}
        onClick={() => dispatch(chooseSong(song.id-1))}
        >
            
            <div className="infor-song">
                <div className="number">{song.id}</div>
                <div className="avatar_song">
                    <img src={song.image} alt="Bài hát" />
                    {!stateActive.play || 
                    <div className="position">
                        <img src={IconPlay} alt="Đang phát" />
                    </div>
                    }
                    
                </div>
                <div className="name_song">
                    <div className="name">{song.name}</div>
                    <div className="brand">{song.brand}</div>
                </div>
            </div>
            <div className="time_song">{stateDuration}</div>
        </div>
    )
}
