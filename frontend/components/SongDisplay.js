import React from 'react';
import { FaMusic } from 'react-icons/fa';

const SongDisplay = ({ songs }) => {
    // Assuming you have a state variable to track the currently playing song
    const currentlyPlayingSong = songs[0]; // Change this to the actual currently playing song

    return (
        <div className="w-3/4 p-4">
            <h2 className="text-2xl font-semibold mb-4">
                <FaMusic className="inline mr-2" /> Now Playing
            </h2>
            {currentlyPlayingSong && (
                <div className="text-xl font-semibold">
                    {currentlyPlayingSong.title} - {currentlyPlayingSong.artist}
                    {/* You can add more details about the currently playing song here */}
                </div>
            )}
        </div>
    );
};

export default SongDisplay;
