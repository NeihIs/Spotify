import React, {
  useEffect,
  useState,
  // , useContext
} from "react";
import { Link, useNavigate } from "react-router-dom";
import Spotify from "../../../spotify/api";
// import AppContext from "../../../store";
import { millisToMinutesAndSeconds } from "../../../utils";
import PlayCard from "../../UI/PlayCard";
import Icon from "../../UI/Icon";
import styles from "./SearchAll.module.css";

import { useSelector } from "react-redux";

const SearchAll = () => {
  const navigate = useNavigate();
  // const appCtx = useContext(AppContext);
  const userLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const searchText = useSelector((state) => state.search.searchText);

  const [albums, setAlbums] = useState(null);
  const [topSong, setTopSong] = useState(null);
  const [songs, setSongs] = useState(null);

  const getAlbums = async () => {
    const results = await Spotify.search(searchText, "album", 7);
    setAlbums(results.albums.items);
  };

  const getSongs = async () => {
    const results = await Spotify.search(searchText, "track", 5);
    setTopSong(results.tracks.items.shift());
    setSongs(results.tracks.items);
  };

  useEffect(() => {
    userLoggedIn && getAlbums();
    userLoggedIn && getSongs();
  }, [searchText]);

  return (
    <React.Fragment>
      <div className={styles.grid}>
        <div className={styles["top-result"]}>
          <div>Top Song</div>
          <div className={styles.card}>
            <img
              loading="lazy"
              src={
                topSong && topSong.album.images[0]
                  ? topSong.album.images[0].url
                  : "/blank.jpg"
              }
              alt="Top Result"
            />
            <div>{topSong ? topSong.name : "..."}</div>
            <div className={styles.row}>
              <div className={styles["meta-link"]}>
                {topSong
                  ? topSong.artists.map((artist, i) => {
                    return (
                      <span
                        key={i}
                        onClick={() => navigate("/artist/" + artist.id)}
                      >
                        {artist.name}
                      </span>
                    );
                  })
                  : "..."}
              </div>
              <div className={styles.chip}>Song</div>
            </div>
            <div className={styles["button-wrapper"]}>
              <Icon name="player-play" color="black" width={18} height={18} />
            </div>
          </div>
        </div>
        <div className={styles.songs}>
          <div>Tracks</div>
          {songs
            ? songs.map((song, index) => (
              <div className={styles.item} key={index}>
                <div className={styles.meta}>
                  <div className={styles.icon}>
                    <Icon
                      name="player-play"
                      color="white"
                      width={16}
                      height={16}
                    />
                  </div>
                  <img
                    loading="lazy"
                    src={
                      song.album.images[0]
                        ? song.album.images[song.album.images.length - 1].url // to get lowest-resolution image
                        : "/blank.jpg"
                    }
                    alt="Top Result"
                  />
                  <div className={styles["meta-infos"]}>
                    <div>{song.name}</div>
                    <div className={styles["meta-infos-artists"]}>
                      {song.artists
                        ? song.artists.map((artist, i) => (
                          <Link to={`/artist/${artist.id}`} key={i}>
                            <span key={i}>{artist.name}</span>
                          </Link>
                        ))
                        : null}
                    </div>
                  </div>
                </div>
                <div>{millisToMinutesAndSeconds(song.duration_ms)}</div>
              </div>
            ))
            : "..."}
        </div>
      </div>
      <div className={styles.header}>Albums</div>
      <div className={styles.tiles}>
        {albums
          ? albums.map((album, index) => (
            <PlayCard
              cover={album.images[0] ? album.images[0].url : "/blank.jpg"}
              title={album.name}
              href={`/album/${album.id}`}
              key={index}
              subtitle={
                album.artists
                  ? album.artists.map((artist, i) => (
                    <span key={i}>{artist.name}</span>
                  ))
                  : "..."
              }
            />
          ))
          : "..."}
      </div>
    </React.Fragment>
  );
};

export default SearchAll;
