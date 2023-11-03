'use client'
import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const imagepath = "https://i1.sndcdn.com/artworks-ykhavMzzmobOTXYI-vm7RSg-t500x500.jpg";

const Player = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [paused, setPaused] = useState(true);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [changingSong, setChangingSong] = useState(false);
    const [volume, setVolume] = useState(50); // Initial volume (0-100)
    const [currentTime, setCurrentTime] = useState(0);
    const [songDuration, setSongDuration] = useState(30000); // Simulated song duration in milliseconds
    const [playbackPosition, setPlaybackPosition] = useState(0);

    // Dummy list of songs
    const songs = [
        {
            title: 'Song 1',
            artist: 'Artist 1',
            url: '/song1.mp3',
        },
        {
            title: 'Song 2',
            artist: 'Artist 2',
            url: '/song2.mp3',
        },
        {
            title: 'Song 3',
            artist: 'Artist 3',
            url: '/song3.mp3',
        },
    ];

    const playPause = () => {
        if (paused) {
            // Start playing from the beginning
            setIsPlaying(true);
            setPaused(false);
            setCurrentTime(0); // Reset currentTime
        } else {
            // Pause the audio and store the current playback position
            setIsPlaying(false);
            setPaused(true);
            setPlaybackPosition(currentTime);
        }
    };

    const previousSong = () => {
        if (currentSongIndex > 0) {
            setChangingSong(true);
            setTimeout(() => {
                setCurrentSongIndex(currentSongIndex - 1);
                setCurrentTime(0); // Reset currentTime
                setChangingSong(false);
                // Add logic to play the previous song here
            }, 500); // Simulated delay for the transition
        }
    };

    const nextSong = () => {
        if (currentSongIndex < songs.length - 1) {
            setChangingSong(true);
            setTimeout(() => {
                setCurrentSongIndex(currentSongIndex + 1);
                setCurrentTime(0); // Reset currentTime
                setChangingSong(false);
                // Add logic to play the next song here
            }, 500); // Simulated delay for the transition
        }
    };

    const handleVolumeChange = (e) => {
        setVolume(e.target.value);
        // Set the volume of the audio element here
    };

    const isMuted = volume === 0; // Check if volume is muted

    useEffect(() => {
        if (isPlaying && !paused) {
            if (currentTime < songDuration) {
                const interval = setInterval(() => {
                    if (isPlaying && !paused) {
                        setCurrentTime((prevTime) => {
                            if (prevTime + 100 <= songDuration) {
                                return prevTime + 100;
                            } else {
                                setIsPlaying(false);
                                setPaused(true);
                                setCurrentTime(0);
                                if (currentSongIndex < songs.length - 1) {
                                    nextSong();
                                }
                                return prevTime;
                            }
                        });
                    }
                }, 100);

                return () => {
                    clearInterval(interval);
                };
            }
        }
    }, [currentSongIndex, isPlaying, paused, currentTime, nextSong, songDuration, songs]);

    useEffect(() => {
        if (isPlaying && !paused) {
            // When resuming, set the current time to the playback position
            setCurrentTime(playbackPosition);
        }
    }, [paused, playbackPosition, isPlaying]);

    return (
        <div className="bg-gray-900 text-white p-4 fixed bottom-0 w-full">
            <div className="container mx-auto relative">
                <div className="absolute inset-0 rounded-lg"></div>
                <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center">
                        <img
                            src={imagepath} // Provide your own music icon image
                            alt="Music Icon"
                            className="w-12 h-12 mr-4 rounded-full"
                        />
                        <div>
                            <h3 className="text-lg font-semibold">
                                {changingSong ? 'Changing Song...' : songs[currentSongIndex].title}
                            </h3>
                            <p className="text-sm">{changingSong ? '' : songs[currentSongIndex].artist}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            className="text-gray-300 hover:text-white focus:outline-none transition-opacity duration-300 ease-in-out"
                            onClick={previousSong}
                        >
                            <FaStepBackward />
                        </button>
                        <button
                            className="text-gray-300 hover:text-white focus:outline-none transition-opacity duration-300 ease-in-out"
                            onClick={playPause}
                        >
                            {isPlaying && !paused ? <FaPause /> : <FaPlay />}
                        </button>
                        <button
                            className="text-gray-300 hover:text-white focus:outline-none transition-opacity duration-300 ease-in-out"
                            onClick={nextSong}
                        >
                            <FaStepForward />
                        </button>
                        <div className="flex items-center">
                            {isMuted ? (
                                <FaVolumeMute
                                    className="mr-2"
                                    onClick={() => setVolume(50)} // Toggle volume on mute icon click
                                />
                            ) : (
                                <FaVolumeUp
                                    className="mr-2"
                                    onClick={() => setVolume(0)} // Toggle mute on volume icon click
                                />
                            )}
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="w-16 h-2"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-2 relative z-10">
                    <div className="bg-gray-800 h-1 w-full rounded-full">
                        <div
                            className="bg-green-400 h-1 rounded-full"
                            style={{ width: `${(currentTime / songDuration) * 100}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Player;
