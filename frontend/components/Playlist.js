import React from 'react';
import { FaMusic } from 'react-icons/fa';

const Playlist = ({ songs }) => {
    return (
        <div className="w-1/4 bg-gray-200 p-4">
            <h2 className="text-xl font-semibold mb-4">
                <FaMusic className="inline mr-2" /> Playlist
            </h2>
            <ul>
                {songs.map((song, index) => (
                    <li key={index} className="mb-2">
                        {song.title} - {song.artist}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Playlist;
