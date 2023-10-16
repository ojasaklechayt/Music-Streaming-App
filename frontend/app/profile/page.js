// pages/profile.js
'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

// Dummy user data for testing
const dummyUserData = {
    username: 'john_doe',
    email: 'johndoe@example.com',
    profilePicture: 'https://placekitten.com/200/200', // Replace with an actual image URL
    bio: 'Hello, I am John Doe. This is my profile.',
    createdPlaylists: ['Playlist 1', 'Playlist 2'], // Replace with actual playlist data
    uploadedSongs: ['Song 1', 'Song 2'], // Replace with actual song data
};

export default function Profile() {
    const [user, setUser] = useState(dummyUserData);

    return (
        <div className="bg-gradient-to-b from-[#181616] to-[#052A4D] min-h-screen flex items-center justify-center text-black">
            <div className="bg-white p-4 rounded-lg shadow-md w-80">
                <img
                    src={user.profilePicture}
                    alt={`${user.username}'s profile picture`}
                    className="w-32 h-32 mx-auto rounded-full"
                />
                <div className='flex flex-row justify-center'>
                    <h2 className="text-2xl font-semibold text-center">{user.username}</h2>
                    <span className="ml-2 text-gray-500 cursor-pointer pt-1">
                        <FontAwesomeIcon icon={faEdit} />
                    </span>
                </div>
                <p className=" text-center">{user.bio}</p>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Email:</h3>
                    <p>{user.email}</p>
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Created Playlists:</h3>
                    <ul>
                        {user.createdPlaylists.map((playlist, index) => (
                            <li key={index}>{playlist}</li>
                        ))}
                    </ul>
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Uploaded Songs:</h3>
                    <ul>
                        {user.uploadedSongs.map((song, index) => (
                            <li key={index}>{song}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
