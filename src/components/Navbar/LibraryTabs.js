import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./LibraryTabs.module.css";

const LibraryTabs = () => {
  const location = useLocation();

  return (
    <div className={styles.tabs}>
      <Link
        to="/collection/playlists"
        className={
          location.pathname === "/collection/playlists" ? styles.active : null
        }
      >
        Playlists
      </Link>
      <Link
        to="/collection/podcasts"
        className={
          location.pathname === "/collection/podcasts" ? styles.active : null
        }
      >
        Podcasts
      </Link>
      <Link
        to="/collection/artists"
        className={
          location.pathname === "/collection/artists" ? styles.active : null
        }
      >
        Artists
      </Link>
      <Link
        to="/collection/albums"
        className={
          location.pathname === "/collection/albums" ? styles.active : null
        }
      >
        Albums
      </Link>
    </div>
  );
};

export default LibraryTabs;
