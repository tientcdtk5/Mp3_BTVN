import IconSong from "../assets/library-music.svg"
import ItemSong from "./ItemSong"
import dataSong from "../dataSong"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../features/store"


export default function ListAlbum() {
    const { currentSong, playing } = useSelector((state: RootState) => state.player)
    const [listSongs, setListSongs] = useState<JSX.Element[]>([]);
    useEffect(() => { 
        const songs = dataSong.map((song) => {
            if (song.id === currentSong.id) {
                return (<ItemSong song={song} key={song.id} stateActive={{active: true, play: playing}} />)
            } else {
                return (<ItemSong song={song} key={song.id} stateActive={{active: false, play: false}} />)
            }
        })
        setListSongs(songs)
    }, [currentSong, playing])

    return (
        <div className="list_song">
            <div className="header_list">
                <div className="title1"><img src={IconSong} alt="Bài hát" />Bài hát</div>
                <div className="title2">Thời gian</div>
            </div>
            <div className="album_list_song">
                {listSongs}
            </div>
        </div>
    )
}