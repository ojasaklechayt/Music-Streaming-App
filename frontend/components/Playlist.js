'use client'
import React, { useState } from 'react';
import { FaMusic } from 'react-icons/fa';

const playlists = [
    {
        name: 'Chill Vibes',
        creator: 'User123',
        coverPhoto: 'https://i.pinimg.com/736x/20/6b/7c/206b7cc931be712a50fb7c5b612fa8bb.jpg',
    },
    {
        name: 'Relaxing Tunes',
        creator: 'User456',
        coverPhoto: 'https://i.scdn.co/image/ab67616d0000b27385ee2cb57cb10c2295773b88',
    },
    {
        name: 'Jazz Classics',
        creator: 'User789',
        coverPhoto: 'https://artwork-cdn.7static.com/static/img/sleeveart/00/313/192/0031319281_350.jpg',
    },
    // Add more playlist objects as needed
];

const Playlist = (props) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handlePlaylistHover = (index) => {
        setActiveIndex(index);
    };

    const handlePlaylistLeave = () => {
        setActiveIndex(null);
    };

    return (
        <div>
            {props.type === "Popular" ? <h1 className="text-2xl font-semibold ml-6 mb-4 text-white">Popular Playlists</h1> : <h1 className="text-2xl font-semibold ml-6 mb-4 text-white">My Playlists</h1>}
            <div className="flex p-4 space-x-4 overflow-x-auto" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                {playlists.map((playlist, index) => (
                    <div
                        key={index}
                        className={`inline-block w-64 p-4 m-2 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${activeIndex === index ? 'bg-indigo-100' : 'bg-gray-200'
                            }`}
                        onMouseEnter={() => handlePlaylistHover(index)}
                        onMouseLeave={handlePlaylistLeave}
                    >
                        <img src={playlist.coverPhoto} alt={playlist.name} className="w-full h-48 object-cover rounded-t-lg text-gray-600" />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2 text-gray-900">{playlist.name}</h2>
                            <p className="text-sm text-gray-600">Creator: {playlist.creator}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Playlist;
