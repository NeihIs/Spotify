import React, { useState, useEffect, useCallback } from "react";
import Spotify from "../../../spotify/api";

import PlayCard from "../../UI/PlayCard";
import HeroCard from "../../UI/HeroCard";

const PlaylistsTab = () => {
  const [playlists, setPlaylists] = useState();
  const [likedSongs, setLikedSongs] = useState();
  const getCurrentUsersPlaylists = useCallback(async () => {
    let listOfPlaylist = await Spotify.getFromSpotify("CURRENT_USER_PLAYLISTS");
    setPlaylists(listOfPlaylist);
  }, []);
  const getCurrentUserSavedTracks = useCallback(async () => {
    let listOfSongs = await Spotify.getFromSpotify("CURRENT_USER_SAVED_TRACKS");
    setLikedSongs(listOfSongs);
  }, []);
  useEffect(() => {
    getCurrentUsersPlaylists();
    getCurrentUserSavedTracks();
  }, [getCurrentUsersPlaylists, getCurrentUserSavedTracks]);
  return (
    <React.Fragment>
      <HeroCard
        to="/collection/tracks"
        title="Liked Songs"
        count={likedSongs ? likedSongs.total : "..."}
        countSuffix=" liked songs"
        list={
          likedSongs
            ? likedSongs.items.map((song) => ({
                name: song.track.name,
                artist: song.track.artists[0].name,
              }))
            : null
        }
      />
      {playlists
        ? playlists.items.map((playlist) => (
            <PlayCard
              key={playlist.id}
              href={`/playlist/${playlist.id}`}
              cover={playlist.images[0] ? playlist.images[0].url : "/blank.jpg"}
              title={playlist.name}
              subtitle={
                playlist.description
                  ? playlist.description
                  : `By ${playlist.owner.display_name}`
              }
            />
          ))
        : null}
    </React.Fragment>
  );
};

export default PlaylistsTab;
