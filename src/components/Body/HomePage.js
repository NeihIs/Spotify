import React, {
  useState,
  useEffect,
  useCallback,
} from "react";
import Spotify from "../../spotify/api";
import TopItem from "../UI/TopItem";
import PlayCard from "../UI/PlayCard";
import BrowseCard from "../UI/BrowseCard";
import styles from "./HomePage.module.css";
import { useSelector } from "react-redux";
import SpotifyPlayer from 'react-spotify-player';

import { welcomingMessage, getRandomRGB } from "../../utils";

const HomePage = () => {

  const size = {
    width: '100%',
    height: 300,
  };
  const view = 'list'; // or 'coverart'
  const theme = 'black'; // or 'white'  

  const userLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);

  const [playlists, setPlaylists] = useState();
  const [topTracks, setTopTracks] = useState();
  const [albums, setAlbums] = useState();
  //lấy Danh sách phát của người dùng
  const getCurrentUsersPlaylists = useCallback(async () => {
    let listOfPlaylist = await Spotify.getFromSpotify("CURRENT_USER_PLAYLISTS");
    setPlaylists(listOfPlaylist);
  }, []);
  const getCurrentUserSavedAlbums = useCallback(async () => {
    let listOfAlbums = await Spotify.getFromSpotify("CURRENT_USER_SAVED_ALBUMS");
    setAlbums(listOfAlbums);
  }, []);

  //lay các bản nhạc hàng đầu của người dùng hiện tại
  const getCurrentUserTopTracks = useCallback(async () => {
    let listOfTracks = await Spotify.getFromSpotify("CURRENT_USER_TOP_TRACKS");
    setTopTracks(listOfTracks);
  }, []);

  useEffect(() => {
    userLoggedIn && getCurrentUsersPlaylists();
    userLoggedIn && getCurrentUserTopTracks();
    userLoggedIn && getCurrentUserSavedAlbums();
  }, [
    userLoggedIn,
    getCurrentUserTopTracks,
    getCurrentUsersPlaylists,
    getCurrentUserSavedAlbums,
  ]);
  console.log({ topTracks });
  return (
    <div className={styles.wrapper}>
      {userLoggedIn && (
        <React.Fragment>
          <div className={styles.message}>{welcomingMessage()}</div>
          <div className={styles["top-items"]}>
            <TopItem
              href="/collection/tracks"
              image="/playlist-cover-liked-songs.png"
              name="Liked Songs"
            />
            {playlists
              ? playlists.items.map((playlist) => (
                <TopItem
                  key={playlist.id}
                  href={`/playlist/${playlist.id}`}
                  image={
                    playlist.images[0] ? playlist.images[0].url : "/blank.jpg"
                  }
                  name={playlist.name}
                />
              ))
              : null}
          </div>
          <div className={styles.title}>Your albums</div>
          <div className={styles["cards-container"]}>
            {albums
              ? albums.items.map((album, i) => (
                <PlayCard
                  href={`/album/${album.album.id}`}
                  key={i}
                  className="not-allowed"
                  cover={
                    album.album.images[0] ? album.album.images[0].url : "/blank.jpg"
                  }
                  title={album.album.name}
                  subtitle={album.album.artists[0].name}
                />
              ))
              : null}
          </div>
          <div className={styles.title}>Your top tracks</div>
          <div className={styles["cards-container"]}>
            {topTracks
              ? topTracks.items.map((item, i) => (
                <SpotifyPlayer
                  uri={item.uri}
                  size={size}
                  view={view}
                  theme={theme}
                />
              ))
              : null}
          </div>
        </React.Fragment>
      )}
      {!userLoggedIn && (
        <React.Fragment>
          <div className={styles["cards-container"]}>
            <PlayCard
              cover="/playlist-cover-liked-songs.png"
              title="Liked Songs"
              subtitle="Your liked songs"
            />
            <BrowseCard
              image="/browse-card-images/pop.jfif"
              name="Genre Cards"
              color={getRandomRGB(255)}
              className="not-allowed"
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default HomePage;
