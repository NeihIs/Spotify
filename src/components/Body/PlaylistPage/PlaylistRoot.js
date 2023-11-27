import React, {
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import Spotify from "../../../spotify/api";
import { calculatePlaylistDuration } from "../../../utils";
import { useDispatch } from "react-redux";
import { changeNavbarNowPlayingText } from "../../../store/reducers/appReducer";
import PlaylistRootHeader from "./PlaylistRootHeader";
import SongList from "./SongList";
import Icon from "../../UI/Icon";
import styles from "./PlaylistRoot.module.css";

const PlaylistRoot = () => {

  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const location = useLocation();
  const isArtistPage = pathname.startsWith("/artist");
  const isPlaylistPage = pathname.startsWith("/playlist");
  const isAlbumPage = pathname.startsWith("/album");
  const isLikedSongsPage = pathname === "/collection/tracks";

  const [artist, setArtist] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [album, setAlbum] = useState([]);
  const [artistTracks, setArtistTracks] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  const generatePageName = () => {
    if (isLikedSongsPage) return "likedSongs";
    if (isArtistPage) return "artist";
    if (isAlbumPage) return "album";
    return "playlist";
  };

  const generatePlaylistImage = () => {
    if (isLikedSongsPage) return "/playlist-cover-liked-songs.png";
    if (isPlaylistPage && playlist.length)
      return playlist && playlist.images[0]
        ? playlist.images[0].url
          ? playlist.images[0].url
          : "/blank.jpg"
        : "/blank.jpg";
    if (isAlbumPage) return album && album.images && album.images[0].url;
    if (isArtistPage) return artist && artist.images && artist.images[0] && artist.images[0].url;
    return "/blank.jpg";
  };

  const generatePlaylistName = () => {
    if (isLikedSongsPage) return "Liked Songs";
    if (isPlaylistPage) return playlist && playlist.name;
    if (isAlbumPage) return album && album.name;
    return artist && artist.name;
  };

  const generatePlaylistOwner = () => {
    if (isLikedSongsPage) return currentUser && currentUser.display_name;
    if (isPlaylistPage && playlist.length) return playlist && playlist.owner.display_name;
    if (isAlbumPage)
      return (
        album && `${album.artists?.[0].name} • ${album.release_date?.substr(0, 4)}`
      );
    return null;
  };

  const generatePlaylistOwnerPP = () => {
    if (isLikedSongsPage && currentUser !== null)
      return currentUser?.images[0].url;
    return "/blank.jpg";
  };

  const generatePlaylistCount = () => {
    if (isLikedSongsPage) return likedSongs && likedSongs.total;
    if (isPlaylistPage) return playlist && playlist.tracks?.total;
    if (isAlbumPage) return album && album.total_tracks;
    return null;
  };

  const generateSongList = () => {
    if (isLikedSongsPage) return likedSongs && likedSongs.items;
    if (isPlaylistPage) return playlist && playlist.tracks?.items;
    if (isAlbumPage) return album && album.tracks?.items;
    if (isArtistPage) return artistTracks && artistTracks.tracks;
    return null;
  };

  let getPlaylist = () => { };
  let getArtist = () => { };
  let getAlbum = () => { };
  let getLikedSongs = () => { };
  let getCurrentUser = () => { };
  let getArtistTracks = () => { };

  if (isPlaylistPage) {
    getPlaylist = async () => {
      let arr = pathname.split("/");
      const playlist = await Spotify.getFromSpotify(
        "PLAYLIST_BY_ID",
        arr[arr.length - 1]
      );
      setPlaylist(playlist);
      dispatch(
        changeNavbarNowPlayingText({ text: playlist.name })
      );
    };
  } else if (isArtistPage) {
    getArtist = async () => {
      let arr = pathname.split("/");
      const artist = await Spotify.getFromSpotify(
        "ARTIST_BY_ID",
        arr[arr.length - 1]
      );
      setArtist(artist);
      dispatch(
        changeNavbarNowPlayingText({ text: artist.name })
      );

    };
    getArtistTracks = async () => {
      let arr = pathname.split("/");
      const artist = await Spotify.getFromSpotify(
        "ARTIST_TOP_TRACKS_BY_ID",
        arr[arr.length - 1]
      );
      setArtistTracks(artist);
    };
  } else if (isLikedSongsPage) {
    getCurrentUser = async () => {
      let currentUser = await Spotify.getFromSpotify("CURRENT_USER");
      setCurrentUser(currentUser);
    };
    getLikedSongs = async () => {
      const likedSongs = await Spotify.getFromSpotify(
        "CURRENT_USER_SAVED_TRACKS"
      );
      setLikedSongs(likedSongs);
      dispatch(
        changeNavbarNowPlayingText({ text: "Liked Songs" })
      );

    };
  } else if (isAlbumPage) {
    getAlbum = async () => {
      let arr = pathname.split("/");
      const album = await Spotify.getFromSpotify(
        "ALBUM_BY_ID",
        arr[arr.length - 1]
      );
      setAlbum(album);
      dispatch(
        changeNavbarNowPlayingText({ text: album.name })
      );

    };
  }

  useEffect(() => {
    if (isPlaylistPage) {
      getPlaylist();
    } else if (isArtistPage) {
      getArtist();
      getArtistTracks();
    } else if (isLikedSongsPage) {
      getCurrentUser();
      getLikedSongs();
    } else if (isAlbumPage) {
      getAlbum();
    }
  }, [
    isAlbumPage,
    isArtistPage,
    isLikedSongsPage,
    isPlaylistPage,
    location.key,
  ]);
  return (
    <div>
      <PlaylistRootHeader
        page={generatePageName()}
        image={generatePlaylistImage()}
        name={generatePlaylistName()}
        description={isPlaylistPage ? playlist && playlist.description : null}
        owner={generatePlaylistOwner()}
        ownerPP={generatePlaylistOwnerPP()}
        followers={isPlaylistPage ? playlist && playlist?.followers?.total : null}
        count={generatePlaylistCount()}
        duration={
          isLikedSongsPage
            ? likedSongs && calculatePlaylistDuration(likedSongs?.items)
            : isPlaylistPage
              ? playlist && calculatePlaylistDuration(playlist.tracks?.items)
              : null
        }
        listeners={artist && artist.followers?.total}
      />
      <div className={styles.wrapper}>
        <div className={styles.noise}></div>
        <div className={styles.actions}>
          <div className={styles.icon}>
            <Icon name="player-play" width={24} height={24} color="#000" />
          </div>
        </div>
        <SongList page={generatePageName()} songs={generateSongList()} />
      </div>
    </div>
  );
};

export default PlaylistRoot;
