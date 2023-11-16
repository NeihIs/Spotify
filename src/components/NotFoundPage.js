import React from "react";
import { Link } from "react-router-dom";
import Icon from "./UI/Icon";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Icon name="logo-colorful" width={60} height={60} />
        <div className={styles.header}>Page not found</div>
        <div className={styles.caption}>
          We can't seem to find the page you are looking for.
        </div>
        <Link to="/" className={styles.button}>
          Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
