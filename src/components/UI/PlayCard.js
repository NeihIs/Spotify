import React from "react";
import { Link } from "react-router-dom";
import { changeTrack } from "../../store/reducers/playerReducer";
import { useDispatch } from "react-redux";

import Icon from "./Icon";
import styles from "./PlayCard.module.css";

const PlayCard = (props) => {
  const dispatch = useDispatch();
  return (
    <Link
      to={props.href}
      className={[props.className, styles.wrapper, "pointer"].join(" ")}
    >
      <img
        loading="lazy"
        className={props.rounded ? styles.rounded : null}
        src={props.cover}
        alt="Cover"
      />
      <div className={styles.title}>{props.title}</div>
      <div className={styles.subtitle}>{props.subtitle}</div>
      {!props.dontShowPlayButton && props.trackUrl && (
        <div
          className={styles["button-wrapper"]}
          onClick={() => dispatch(changeTrack({ track: props.trackUrl }))}
        >
          <Icon name="player-play" color="black" width={18} height={18} />
        </div>
      )}
    </Link>
  );
};

export default PlayCard;
