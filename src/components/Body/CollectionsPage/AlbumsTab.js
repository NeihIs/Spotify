import React, { useEffect, useState, useCallback } from "react";
import Spotify from "../../../spotify/api";
import PlayCard from "../../UI/PlayCard";

const AlbumsTab = () => {
  const [albums, setAlbums] = useState();
  const getCurrentUserSavedAlbums = useCallback(async () => {
    let listOfAlbums = await Spotify.getFromSpotify("CURRENT_USER_SAVED_ALBUMS");
    setAlbums(listOfAlbums);
  }, []);
  useEffect(() => {
    getCurrentUserSavedAlbums();
  }, [getCurrentUserSavedAlbums]);

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default AlbumsTab;
