import React from "react";
import { useLocation } from "react-router-dom";

import PlaylistsTab from "./PlaylistsTab";
import PodcastsTab from "./PodcastsTab";
import ArtistsTab from "./ArtistsTab";
import AlbumsTab from "./AlbumsTab";
import styles from "./CollectionsPage.module.css";

const CollectionsPage = ({ tab }) => {
  const { pathname } = useLocation();
  const isPlaylistsTab = pathname === "/collection/playlists";
  const isPodcastsTab = pathname === "/collection/podcasts";
  const isArtistsTab = pathname === "/collection/artists";
  const isAlbumsTab = pathname === "/collection/albums";

  return (
    <div className={styles.wrapper}>
      <div>{tab}</div>
      <div className={styles["cards-container"]}>
        {isPlaylistsTab && <PlaylistsTab />}
        {isPodcastsTab && <PodcastsTab />}
        {isArtistsTab && <ArtistsTab />}
        {isAlbumsTab && <AlbumsTab />}
      </div>
      <div style={{ height: 50 }}></div>
    </div>
  );
};

export default CollectionsPage;
