import React, {
  useRef,
  useState,
  // , useContext
} from "react";
import ReactAudioPlayer from "react-audio-player";
// import AppContext from "../../store";
import { convertFloatToTime } from "../../utils";
import Icon from "../UI/Icon";
import styles from "./Player.module.css";
import { useSelector, useDispatch } from "react-redux";
import { play, pause, loop } from "../../store/reducers/playerReducer";

const Player = () => {
  const audioPlayer = useRef();

  const playerVolume = useSelector((state) => state.player.volume);
  const playerMuted = useSelector((state) => state.player.muted);
  const playerLooped = useSelector((state) => state.player.looped);
  const playerTrackSrc = useSelector((state) => state.player.trackSrc);
  const playerIsPlaying = useSelector((state) => state.player.isPlaying);
  const dispatch = useDispatch();

  // const appCtx = useContext(AppContext);
  const [currentTime, setCurrentTime] = useState(0);
  const [durationValue, setDurationValue] = useState(0);

  const onPlaying = () => {
    const duration = audioPlayer.current.audioEl.current.duration;
    const currentTime = audioPlayer.current.audioEl.current.currentTime;
    const durationValue = (currentTime / duration) * 100;
    setDurationValue(durationValue);
    setCurrentTime(currentTime);
  };

  return (
    <div className={styles["player-wrapper"]}>
      <ReactAudioPlayer
        id="audio-player"
        controls={false}
        light={false}
        height={0}
        width={0}
        ref={audioPlayer}
        src={playerTrackSrc}
        playing={playerIsPlaying}
        loop={playerLooped}
        muted={playerMuted}
        volume={playerVolume}
        onStart={() => dispatch(play())}
        onListen={onPlaying}
        listenInterval={500}
        onSeeked={(e) => e}
        onEnded={() => dispatch(pause())}
        onError={(e) => console.log("onError", e)}
      />
      <div className={styles["player-control-buttons"]}>
        <div className={styles["hover-white"]}>
          <Icon
            name="player-shuffle"
            color="rgb(255, 255, 255, .7)"
            width={16}
            height={16}
          />
        </div>
        <div className={styles["hover-white"]}>
          <Icon
            name="player-skip-back"
            color="rgb(255, 255, 255, .7)"
            width={16}
            height={16}
          />
        </div>
        <div
          className={styles["player-control-play"]}
          onClick={
            playerIsPlaying ? () => dispatch(pause()) : () => dispatch(play())
          }
        >
          {playerIsPlaying ? (
            <Icon name="player-pause" color="black" width={16} height={16} />
          ) : (
            <Icon name="player-play" color="black" width={16} height={16} />
          )}
        </div>
        <div className={styles["hover-white"]}>
          <Icon
            name="player-skip-forward"
            color="rgb(255, 255, 255, .7)"
            width={16}
            height={16}
          />
        </div>
        <div onClick={() => dispatch(loop({ loop: !playerLooped }))}>
          <Icon
            name={`player-repeat${playerLooped ? "-active" : ""}`}
            color="rgb(255, 255, 255, .7)"
            width={16}
            height={16}
          />
        </div>
      </div>
      <div className={styles["player-control-bar"]}>
        <div className={styles["player-control-position"]}>
          {convertFloatToTime(currentTime)}
        </div>
        <div className={styles["player-control-progress"]}>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={durationValue}
            onChange={(e) => {
              const duration = audioPlayer.current.audioEl.current.duration;
              audioPlayer.current.audioEl.current.currentTime =
                (e.target.value * duration) / 100;
              setDurationValue(e.target.value);
            }}
          />
        </div>
        <div className={styles["player-control-duration"]}>
          {convertFloatToTime(
            audioPlayer.current
              ? audioPlayer.current.audioEl.current.duration
              : "0.0"
          )}
        </div>
      </div>
    </div>
  );
};

export default Player;
