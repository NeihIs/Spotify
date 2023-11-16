import React, {
  useEffect,
  useState,
  // , useContext
} from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Spotify from "../../../spotify/api";
// import AppContext from "../../../store";
import { getRandomRGB } from "../../../utils";

import BrowseCard from "../../UI/BrowseCard";
import PlayCard from "../../UI/PlayCard";
import styles from "./CardsGrid.module.css";

const Genres = (props) => {

  const userLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const searchText = useSelector((state) => state.search.searchText);

  const { searchType } = useParams();

  const [list, setList] = useState({
    genres: null,
    artists: null,
    playlists: null,
    albums: null,
    shows: null,
  });

  const isCoverRounded = searchType === ("artists" || "users");
  const dontShowPlayButton = searchType === ("podcastAndEpisodes" || "users");

  const getGenres = async (limit) => {
    const genresList = await Spotify.getFromSpotify(
      "FEATURED_PLAYLISTS",
      limit
    );
    setList({ ...list, genres: genresList.playlists.items });

  };



  const getResultsBySearchType = async (type) => {
    if (type === "artists") {
      const results = await Spotify.search(searchText, "artist");
      setList((list) => ({ ...list, artists: results.artists.items }));

    }
    if (type === "playlists") {
      const results = await Spotify.search(searchText, "playlist");
      setList((list) => ({ ...list, playlists: results.playlists.items }));

    }
    if (type === "albums") {
      const results = await Spotify.search(searchText, "album");
      setList((list) => ({ ...list, albums: results.albums.items }));

    }
    if (type === "podcastAndEpisodes") {
      const results = await Spotify.search(searchText, "show");
      setList((list) => ({ ...list, shows: results.shows.items }));

    }
  };

  useEffect(() => {
    userLoggedIn && props.genres && getGenres(20);
    userLoggedIn && getResultsBySearchType(searchType);
  }, [props.genres, searchType]);
  return (
    <div
      className={
        props.genres ? styles["padding-genres"] : styles["padding-others"]
      }
    >
      {props.genres && <div className={styles["text-browse"]}>Browse all</div>}
      <div className={styles["cards-container"]}>
        {props.genres && (
          <React.Fragment>
            {list.genres
              ? list.genres.map((genre, i) => (
                <BrowseCard
                  key={i}
                  id={genre.id}
                  name={genre.name}
                  color={getRandomRGB(255)}
                  image={genre.images[0].url}
                />
              ))
              : "You should login first"}
          </React.Fragment>
        )}
        {
          // TODO: .map functions repetitive, will be fixed!
        }
        {!props.genres && (
          <React.Fragment>
            {searchType === "artists" && list.artists
              ? list.artists.map((artist, i) => (
                <PlayCard
                  key={i}
                  id={artist.id}
                  href={`/artist/${artist.id}`}
                  cover={
                    artist.images.length > 0
                      ? artist.images[0].url
                      : "/blank.jpg"
                  }
                  title={artist.name}
                  subtitle="Artist"
                  rounded={isCoverRounded}
                  dontShowPlayButton={dontShowPlayButton}
                />
              ))
              : null}
            {searchType === "playlists" && list.playlists
              ? list.playlists.map((playlist, i) => (
                <PlayCard
                  key={i}
                  id={playlist.id}
                  href={`/playlist/${playlist.id}`}
                  cover={
                    playlist.images.length > 0
                      ? playlist.images[0].url
                      : "/blank.jpg"
                  }
                  title={playlist.name}
                  subtitle="Playlist"
                  rounded={isCoverRounded}
                  dontShowPlayButton={dontShowPlayButton}
                />
              ))
              : null}
            {searchType === "albums" && list.albums
              ? list.albums.map((album, i) => (
                <PlayCard
                  key={i}
                  id={album.id}
                  href={`/album/${album.id}`}
                  cover={
                    album.images.length > 0
                      ? album.images[0].url
                      : "/blank.jpg"
                  }
                  title={album.name}
                  subtitle="Album"
                  rounded={isCoverRounded}
                  dontShowPlayButton={dontShowPlayButton}
                />
              ))
              : null}
            {searchType === "podcastAndEpisodes" && list.shows
              ? list.shows.map((show, i) => (
                <PlayCard
                  key={i}
                  id={show.id}
                  cover={
                    show.images.length > 0 ? show.images[0].url : "/blank.jpg"
                  }
                  title={show.name}
                  subtitle="Podcasts and Episodes"
                  rounded={isCoverRounded}
                  dontShowPlayButton={dontShowPlayButton}
                />
              ))
              : null}
            {searchType === "users" && (
              <figure>
                Spotify API isn't supporting user-search at the moment{" "}
                <a
                  href="https://github.com/spotify/web-api/issues/95"
                  target="_blank"
                  rel="noreferrer"
                  className="link"
                >
                  related github issue
                </a>
              </figure>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Genres;
