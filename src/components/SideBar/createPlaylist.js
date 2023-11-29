
import React from 'react';

import Spotify from "../../spotify/api";


const CreatePlaylist = () => {

    const handleCreatePlaylist = async (e) => {
        e.preventDefault();
        const playlistName = document.getElementById('playlistName').value;
        let result = await Spotify.createPlaylist(playlistName);
        console.log({ result });
    };

    console.log(handleCreatePlaylist);
    return (
        <form onSubmit={handleCreatePlaylist}>
            <label htmlFor="name">Playlist name: </label>
            <br></br>
            <br />
            <input
                placeholder="Enter Playlist Name"
                id="playlistName"
                required
            />
            <br />
            <br />
            <button type="submit">Create</button>

        </form>
    );
};

export default CreatePlaylist;






