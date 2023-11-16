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

import { welcomingMessage, getRandomRGB } from "../../utils";

const HomePage = () => {

  const userLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);

  const [playlists, setPlaylists] = useState();
  const [topTracks, setTopTracks] = useState();

  const getCurrentUsersPlaylists = useCallback(async () => {
    let listOfPlaylist = await Spotify.getFromSpotify("CURRENT_USER_PLAYLISTS");
    setPlaylists(listOfPlaylist);
  }, []);

  const getCurrentUserTopTracks = useCallback(async () => {
    let listOfTracks = await Spotify.getFromSpotify("CURRENT_USER_TOP_TRACKS");
    setTopTracks(listOfTracks);
  }, []);

  useEffect(() => {
    userLoggedIn && getCurrentUsersPlaylists();
    userLoggedIn && getCurrentUserTopTracks();
  }, [
    userLoggedIn,
    getCurrentUserTopTracks,
    getCurrentUsersPlaylists,
  ]);
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
          <div className={styles.title}>Your top tracks</div>
          <div className={styles["cards-container"]}>
            {topTracks
              ? topTracks.items.map((item, i) => (
                <PlayCard
                  key={i}
                  cover={item.album.images[0].url}
                  title={item.name}
                  subtitle={item.artists.map((artist) => artist.name + " ")}
                  trackUrl={item.preview_url}
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
