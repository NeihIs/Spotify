import React from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./SearchNavigation.module.css";

const SearchNavigation = () => {
  const { searchTerm, searchType } = useParams();
  return (
    <div className={styles.tabs}>
      <Link
        to={searchTerm || ""}
        className={searchType === undefined ? styles.active : null}
      >
        All
      </Link>
      <Link
        to={searchTerm + "/artists"}
        className={searchType === "artists" ? styles.active : null}
      >
        Artists
      </Link>
      <Link
        to={searchTerm + "/tracks"}
        className={searchType === "tracks" ? styles.active : null}
      >
        Songs
      </Link>
      <Link
        to={searchTerm + "/playlists"}
        className={searchType === "playlists" ? styles.active : null}
      >
        Playlists
      </Link>
      <Link
        to={searchTerm + "/albums"}
        className={searchType === "albums" ? styles.active : null}
      >
        Albums
      </Link>
      <Link
        to={searchTerm + "/podcastAndEpisodes"}
        className={searchType === "podcastAndEpisodes" ? styles.active : null}
      >
        Podcasts & Shows
      </Link>
      <Link
        to={searchTerm + "/users"}
        className={searchType === "users" ? styles.active : null}
      >
        Profiles
      </Link>
    </div>
  );
};

export default SearchNavigation;
