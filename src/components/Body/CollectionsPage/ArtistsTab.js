import React, { useState, useCallback, useEffect } from "react";
import Spotify from "../../../spotify/api";
import PlayCard from "../../UI/PlayCard";

const ArtistsTab = () => {
  const [artists, setArtists] = useState();
  const getCurrentUserFollowedArtists = useCallback(async () => {
    let listOfArtists = await Spotify.getFromSpotify("CURRENT_USER_FOLLOWED_ARTISTS");
    setArtists(listOfArtists);
  }, []);
  useEffect(() => {
    getCurrentUserFollowedArtists();
  }, [getCurrentUserFollowedArtists]);

  return (
    <React.Fragment>
      {artists
        ? artists.artists.items.map((artist, i) => (
          <PlayCard
            key={i}
            href={`/artist/${artist.id}`}
            cover={artist.images[0] ? artist.images[0].url : "/blank.jpg"}
            rounded
            title={artist.name}
          />
        ))
        : null}
    </React.Fragment>
  );
};

export default ArtistsTab;
