import React from "react";
import { Link } from "react-router-dom";
import styles from "./BrowseCard.module.css";

const BrowseCard = (props) => {
  return (
    <Link
      to={props.id ? `/playlist/${props.id}` : null}
      className={styles.wrapper}
      style={{ backgroundColor: props.color }}
    >
      <div>{props.name}</div>
      <img loading="lazy" src={props.image} alt={props.name} />
    </Link>
  );
};

export default BrowseCard;
