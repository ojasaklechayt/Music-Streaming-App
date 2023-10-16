// Import necessary models
const Playlist = require('../models/playlistModel');
const Song = require('../models/songModel');
const User = require('../models/userModel');
const fs = require('fs');
const path = require('path');

// Controller functions for playlist-related actions

// Create a new playlist
exports.createPlaylist = async (req, res) => {
    try {
        const { name, id, songs, playlistPhoto } = req.body;

        // Find the user by their ID
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        // Create a new playlist with the provided name, creator ID, and songs
        const newPlaylist = new Playlist({
            name,
            creator: id,
            songs: songs || [],
            playlistPhoto: '' // Initialize with an empty string for the file path
        });

        if (playlistPhoto) {
            // Convert the base64-encoded image data to a buffer
            const imageBuffer = Buffer.from(playlistPhoto, 'base64');

            // Generate a unique file name for the playlist's photo
            const uniqueFileName = `${newPlaylist._id}-${Date.now()}.jpg`;

            // Define the file path
            const filePath = path.join(__dirname, 'uploads', uniqueFileName);

            // Write the image data to the file
            fs.writeFileSync(filePath, imageBuffer);

            // Update the playlist's photo field with the file path
            newPlaylist.playlistPhoto = filePath;
        }

        // Save the new playlist
        await newPlaylist.save();

        // Update the user's createdPlaylists with the new playlist's ID
        user.createdPlaylists.push(newPlaylist._id);
        await user.save();

        res.status(201).json(newPlaylist);
    } catch (error) {
        console.error("Error Creating Playlist: ", error);
        res.status(500).json({ message: "Error Creating Playlist" });
    }
};

// Edit an existing playlist
exports.editPlaylist = async (req, res) => {
    try {
        const { name, userId, playlistPhoto } = req.body;
        const playlistId = req.params.id;

        // Find the playlist by its ID
        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: "Playlist Not Found" });
        }

        if (!userId || typeof userId !== 'string') {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        // Check if the user is the owner of the playlist
        if (playlist.creator.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized: You are not the owner of this playlist" });
        }

        // Update the playlist's name if provided
        if (name) {
            playlist.name = name;
        }

        if (playlistPhoto) {
            // Convert the base64-encoded image data to a buffer
            const imageBuffer = Buffer.from(playlistPhoto, 'base64');

            // Generate a unique file name for the playlist's photo
            const uniqueFileName = `${playlist._id}-${Date.now()}.jpg`;

            // Define the file path
            const filePath = path.join(__dirname, 'uploads', uniqueFileName);

            // Write the image data to the file
            fs.writeFileSync(filePath, imageBuffer);

            // Update the playlist's photo field with the new file path
            playlist.playlistPhoto = filePath;
        }

        await playlist.save();
        res.status(200).json({ playlist });
    } catch (error) {
        console.error("Error Editing Playlist: ", error);
        res.status(500).json({ message: "Error Editing Playlist" });
    }
};

// Delete a playlist
exports.deletePlaylist = async (req, res) => {
    try {
        const playlistId = req.params.id;

        // Find the playlist by its ID
        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: "Playlist Not Found" });
        }

        const userId = playlist.creator;

        // Find the user by their ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        // Check if the user is the owner of the playlist
        if (playlist.creator.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized: You are not the owner of this playlist" });
        }

        // Remove the playlist ID from the user's createdPlaylists
        user.createdPlaylists.pull(playlistId);
        await user.save();

        // Delete the playlist
        await Playlist.deleteOne({ _id: playlistId });

        res.status(204).end({ message: "Playlist Deleted Successfully!!" });
        console.log("Playlist Deleted Successfully!!");
    } catch (error) {
        console.error("Error Deleting Playlist: ", error);
        res.status(500).json({ message: "Error Deleting Playlist" });
    }
};

// Add a song to a playlist
exports.addSongToPlaylist = async (req, res) => {
    try {
        const { songId } = req.body;
        const playlistId = req.params.id;

        // Find the playlist by its ID
        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: "Playlist Not Found" });
        }

        // Find the song by its ID
        const song = await Song.findById(songId);

        if (!song) {
            return res.status(404).json({ message: "Song Not Found" });
        }

        // Check if the song already exists in the playlist
        const songExistsInPlaylist = playlist.songs.some((playlistSong) =>
            playlistSong.equals(song._id)
        );

        if (songExistsInPlaylist) {
            return res.status(400).json({ message: "Song already exists in the playlist" });
        }

        // Add the song to the playlist's songs array
        playlist.songs.push(song);
        await playlist.save();
        res.status(200).json(playlist);
    } catch (error) {
        console.error("Error Adding Songs To The Playlist: ", error);
        res.status(500).json({ message: "Error Adding Songs To The Playlist" });
    }
};

// Remove a song from a playlist
exports.removeSongFromPlaylist = async (req, res) => {
    try {
        const playlistId = req.params.id;
        const songId = req.params.songId;

        // Find the playlist by its ID
        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: "Playlist Not Found " });
        }

        // Remove the song ID from the playlist's songs array
        playlist.songs.pull(songId);
        await playlist.save();

        res.status(200).json(playlist);
    } catch (error) {
        console.error("Error Deleting Songs From The Playlist: ", error);
        res.status(500).json({ message: "Error Deleting Songs From The Playlist" });
    }
};

// Find playlists created by a specific user
exports.findPlaylistsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find playlists with the specified creator (user ID)
        const playlists = await Playlist.find({ creator: userId });

        res.status(200).json(playlists);
        console.log("Here're The Playlists");
    } catch (error) {
        console.error('Error Fetching Playlists For User: ', error);
        res.status(500).json({ message: "Error Fetching Playlists For User" });
    }
};

// Get all playlists
exports.getAllPlaylists = async (res) => {
    try {
        // Find and retrieve all playlists
        const playlists = await Playlist.find();

        if (!playlists || playlists.length === 0) {
            return res.status(404).json({ message: "No Playlist Found" });
        }

        res.status(200).json(playlists);
    } catch (error) {
        console.error('Error Getting All The Playlist: ', error);
        res.status(500).json({ message: "Error Getting All The Playlists" });
    }
};

// Get a specific playlist by ID
exports.getPlaylistbyId = async (req, res) => {
    try {
        const playlistId = req.params.id;

        // Find the playlist by its ID
        const playlist = await Playlist.find({ playlistId });

        if (!playlist || playlist.length === 0) {
            return res.status(404).json({ message: "No Playlist Found by ID" });
        }

        res.status(200).json(playlist);
    } catch (error) {
        console.error('Error Fetching Specific Playlist: ', error);
        res.status(500).json({ message: "Error Fetching Specific Playlist" });
    }
};

// Get all songs from a specific playlist
exports.getAllSongsFromPlaylist = async (req, res) => {
    try {
        const playlistId = req.params.id;

        // Find the playlist by its ID
        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: "Playlist Not Found" });
        }

        // Find all songs in the playlist's songs array
        const songs = await Song.find({ _id: { $in: playlist.songs } });

        res.status(200).json(songs);
    } catch (error) {
        console.error('Error Fetching Songs From Playlist: ', error);
        res.status(500).json({ message: "Error Fetching Songs From Playlist" });
    }
};
