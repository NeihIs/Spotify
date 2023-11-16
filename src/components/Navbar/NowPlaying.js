import React from // , { useContext }
  "react";
// import AppContext from "../../store";
import Icon from "../UI/Icon";
import styles from "./NowPlaying.module.css";
import { useSelector } from "react-redux";


const NowPlaying = () => {
  const text = useSelector((state) => state.app.navbarNowPlayingText);
  return (
    <div className={styles.wrapper} id="navbar-now-playing-wrapper">
      <div className={styles.icon}>
        <Icon name="player-play" color="#000" width={20} height={20} />
      </div>
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default NowPlaying;
