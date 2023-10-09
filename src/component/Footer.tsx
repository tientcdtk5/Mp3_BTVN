import Heart from "../assets/heart.svg";
import SouffleIcon from "../assets/random.svg";
import PrevIcon from "../assets/previous.svg";
import PlayIcon from "../assets/play-button-inside-a-circle.svg";
import PauseIcon from "../assets/pause-button.svg";
import NextIcon from "../assets/next-button.svg";
import RepeatIcon from "../assets/swap.svg";
import VolumeIcon from "../assets/speaker-filled-audio-tool.svg";
import MvIcon from "../assets/video-player.svg";
import MuteIcon from "../assets/mute.svg";
import VolumeDownIcon from "../assets/volume-down.svg";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../features/store";
import { useEffect, useRef } from "react";
import {
  togglePlay,
  nextPlayer,
  prevPlayer,
  toggleRepeat,
  toggleSuffle,
  setVolume
} from "../features/player.slice";

export default function Footer() {
  const dispatch = useDispatch();
  const {currentSong, playing, suffle, repeat, volume } =
    useSelector((state: RootState) => state.player);

  const newAudio = useRef<HTMLAudioElement>(new Audio());
  const durationSong = useRef<HTMLSpanElement | null>(null);
  const currentTimeSong = useRef<HTMLSpanElement | null>(null);
  const timeBarSong = useRef<HTMLInputElement | null>(null);


  useEffect(() => {
    newAudio.current.src = currentSong.url;
    newAudio.current.load();
    document.title = currentSong.name;
  }, [currentSong]);
  useEffect(() => {
    if (playing) {
      newAudio.current.play();
    } else {
      newAudio.current.pause();
    }
  }, [playing, currentSong]);

  useEffect(() => {
    //Setup duration song
    const durationChange = () => {
      if (durationSong.current) {
        const minutesDuration = Math.floor(newAudio.current.duration / 60);
        const secondsDuration = String(
          Math.floor(newAudio.current.duration % 60)
        );
        durationSong.current.textContent =
          minutesDuration + ":" + secondsDuration.padStart(2, "0");

        //setup max range cho duration input
        timeBarSong.current &&
          (timeBarSong.current.max = String(newAudio.current.duration));
      }
    };

    //Khi audio đang phát
    const currentTimeUpdate = () => {
      if (currentTimeSong.current) {
        //set current Time song
        const minutesCurrent = String(
          Math.floor(newAudio.current.currentTime / 60)
        );
        const secondsCurrent = String(
          Math.floor(newAudio.current.currentTime % 60)
        );
        currentTimeSong.current.textContent =
          minutesCurrent.padStart(2, "0") +
          ":" +
          secondsCurrent.padStart(2, "0");

        //setup max range cho duration input
        timeBarSong.current &&
          (timeBarSong.current.value = String(newAudio.current.currentTime));
      }
    };

    //Kéo thả thanh duration time

    newAudio.current.addEventListener("durationchange", durationChange);
    newAudio.current.addEventListener("timeupdate", currentTimeUpdate);

    return () => {
      newAudio.current.removeEventListener("durationchange", durationChange);
      newAudio.current.removeEventListener("timeupdate", currentTimeUpdate);
    };
  }, []);

  useEffect(()=> {
    const onEnded = () => {
        //Nếu có repeat
        if (repeat) {
          newAudio.current.currentTime = 0;
          newAudio.current.play()
        }  else {
          dispatch(nextPlayer());
        }
      };
      
      newAudio.current.addEventListener("ended", onEnded);
      return () => {
        newAudio.current.removeEventListener("ended", onEnded);
      }
  }, [repeat])

  return (
    <div className="footer">
      <div className="footer-left">
        <img className="footer-avatar" src={currentSong.image} alt="" />
        <div style={{ marginLeft: "0.5rem" }}>
          <div className="name-music">{currentSong.name}</div>
          <div className="brand-music">{currentSong.brand}</div>
        </div>
        <img className="whishlist" src={Heart} alt="Yêu thích" />
      </div>

      <div className="footer-center">
        <div className="footer_action-music">
          <Button
            className={suffle ? "active" : ""}
            onClick={() => dispatch(toggleSuffle())}
          >
            <img src={SouffleIcon} alt="Xáo trộn" />
          </Button>
          <Button onClick={() => dispatch(prevPlayer())}>
            <img src={PrevIcon} alt="Lùi lại" />
          </Button>
          <Button
            className="button_play"
            onClick={() => {
              dispatch(togglePlay());
            }}
          >
            {playing ? (
              <img src={PauseIcon} alt="Dừng nhạc" />
            ) : (
              <img src={PlayIcon} alt="Phát nhạc" />
            )}
          </Button>
          <Button onClick={() => dispatch(nextPlayer())}>
            <img src={NextIcon} alt="Bài tiếp theo" />
          </Button>
          <Button
            className={repeat ? "active" : ""}
            onClick={() => dispatch(toggleRepeat())}
          >
            <img src={RepeatIcon} alt="Lặp lại" />
          </Button>
        </div>
        <div className="footer_timeline-music">
          <span className="time-start" ref={currentTimeSong}>
            00:00
          </span>
          <Form.Range
            className="input-timeline"
            ref={timeBarSong}
            onChange={(e) => {
              newAudio.current.currentTime = +e.target.value;
            }}
          ></Form.Range>
          <span className="time-end" ref={durationSong}>
            00:00
          </span>
        </div>
      </div>

      <div className="footer-right">
        <div className="footer_mv">
          <img src={MvIcon} alt="Xem Mv" />
        </div>
        <Button
        onClick={()=> {
          dispatch(setVolume(0));
          newAudio.current.volume = 0
        } }
        >
          {volume === 0 ? (
            <img src={MuteIcon} alt="Bật tiếng" />
          ) : volume <= 0.5 ? (
            <img src={VolumeDownIcon} alt="Nhỏ" />
          ) : <img src={VolumeIcon} alt="Lớn" />}
        </Button>
        <Form.Range
        max={1}
        min={0}
        step={0.01}
        value={volume}
        onChange={(e) => {
            dispatch(setVolume(+e.target.value));
            newAudio.current.volume =  +e.target.value;
        }}
        >
        </Form.Range>
      </div>
    </div>
  );
}
