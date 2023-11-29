import React from "react";
import { useLocation } from "react-router-dom";
import PlaylistsTab from "./PlaylistsTab";
import styles from "./CollectionsPage.module.css";

const CollectionsPage = ({ tab }) => {
  const { pathname } = useLocation();
  const isPlaylistsTab = pathname === "/collection/playlists";

  return (
    <div className={styles.wrapper}>
      <div>{tab}</div>
      <div className={styles["cards-container"]}>
        {isPlaylistsTab && <PlaylistsTab />}

      </div>
      <div style={{ height: 50 }}></div>
    </div>
  );
};

export default CollectionsPage;
