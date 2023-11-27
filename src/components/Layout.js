import React from "react";
import styles from "./Layout.module.css";
import Body from "./Body/Body";
import SideBar from "./SideBar/SideBar";
import PlayerBar from "./PlayerBar/PlayerBar";
const Layout = () => {
  return (
    <div className={styles.container}>
      <SideBar />
      <Body />
      <PlayerBar />
    </div>
  );
};

export default Layout;
