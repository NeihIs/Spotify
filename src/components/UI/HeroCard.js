import React from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";
import styles from "./HeroCard.module.css";

const HeroCard = (props) => {
  return (
    <Link
      to={props.to ? props.to : ""}
      className={[props.className, styles.wrapper].join(" ")}
    >
      <div className={styles.list}>
        {props.list
          ? props.list.map((item, i) => (
            <div key={i}>
              <span>{item.name}</span>
              <span>{item.artist}</span>
            </div>
          ))
          : null}
      </div>
      <div className={styles.name}>{props.title}</div>
      <div className={styles.count}>
        {props.count} {props.countSuffix}
      </div>
      <div className={styles["button-wrapper"]}>
        <Icon name="player-play" color="black" width={18} height={18} />
      </div>
    </Link>
  );
};

export default HeroCard;
