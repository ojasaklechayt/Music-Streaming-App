// Import necessary models
const Song = require('../models/songModel');
const User = require('../models/userModel');
const fs = require('fs');
const path = require('path');
// Controller functions for song-related actions

// Get all songs
exports.getAllSongs = async (res) => {
    try {
        // Find all songs in the database
        const songs = await Song.find();
        res.status(200).json({ songs });
    } catch (error) {
        console.error('Error Fetching All The Songs: ', error);
        res.status(500).json({ message: "Error Fetching All The Songs" })
    }
}

// Get a song by name
exports.getSongByName = async (req, res) => {
    try {
        const { name } = req.body;

        // Find a song with the provided name
        const song = await Song.findOne({ name });

        if (!song) {
            return res.status(404).json({ song: [] });
        }
        res.status(200).json({ song });
    } catch (error) {
        console.error("Error Fetching Specific Songs by Name: ", error);
        res.status(500).json({ message: "Error Fetching Specific Songs by Name" });
    }
}

// Upload a new song in form-data format
exports.uploadSong = async (req, res) => {
    try {
        const { title, artist, genre, owner } = req.body;

        // Find the user who is the owner of the song
        const user = await User.findById(owner);

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        const audioData = req.files.audio.data;
        const audioContentType = req.files.audio.mimetype;

        // Create a new song document with the provided data and audio
        const newSong = new Song({
            title,
            artist,
            genre,
            owner,
            audio: {
                data: audioData,
                contentType: audioContentType,
            },
        });

        // Save the new song to the database
        await newSong.save();

        // Update the user's uploaded songs list
        user.uploadedSongs.push(newSong._id);
        await user.save();

        res.status(201).json({ message: "Song Uploaded Successfully", song: newSong, user: user });
    } catch (error) {
        console.error("Error Uploading Data: ", error);
        res.status(500).json({ message: "Error Uploading Data" });
    }
}

// Get songs by artist
exports.getSongByArtist = async (req, res) => {
    try {
        const { Artist } = req.query;

        // Find songs with the provided artist name
        const song = await Song.find({ Artist });

        if (!song) {
            return res.status(404).json({ song: [] });
        }
        res.status(200).json({ song });
    } catch (error) {
        console.error("Error Fetching Specific Songs by Artist: ", error);
        res.status(500).json({ message: "Error Fetching Specific Songs by Artist" });
    }
}

// Get songs by genre
exports.getSongByGenre = async (req, res) => {
    try {
        const { Genre } = req.body;

        // Find songs with the provided genre
        const song = await Song.find({ Genre });

        if (!song || song.length === 0) {
            return res.status(404).json({ song: [] });
        }

        res.status(200).json({ song });
    } catch (error) {
        console.error("Error Fetching Specific Songs by Genre: ", error);
        res.status(500).json({ message: "Error Fetching Specific Songs by Genre" });
    }
}

// Delete a song
exports.deleteSong = async (req, res) => {
    try {
        const userId = req.params.userId;
        const songID = req.params.songId;

        // Find the song by its ID
        const song = await Song.findById(songID);

        if (!song) {
            return res.status(404).json({ message: "Song Not Found" });
        }

        // Find the user by their ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        // Check if the user is the owner of the song
        if (song.owner.toString() !== userId.toString()) {
            return res.status(403).json("Unauthorized: You are not the owner of this song");
        }

        // Remove the song from the user's uploaded songs list
        user.uploadedSongs.pull(songID);
        await user.save();

        // Delete the song from the database
        await Song.deleteOne({ _id: songID });

        res.status(204).end({ message: "Song Deleted Successfully!!" });
        console.log("Song Deleted Successfully!!");

    } catch (error) {
        console.error("Song Deletion Error: ", error);
        res.status(500).json({ message: "Song Deletion Error" });
    }
}

exports.editSong = async (req, res) => {
    try {
        const songId = req.params.songId;
        const { title, artist, genre, SongPhoto } = req.body;
        const userId = req.body.userId;

        // Find the song by its ID
        const song = await Song.findById(songId);

        if (!song) {
            return res.status(404).json({ message: "Song Not Found" });
        }

        // Check if the user is the owner of the song
        if (song.owner.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized: You are not the owner of this song" });
        }

        // Convert the base64-encoded image data to a buffer
        const imageBuffer = Buffer.from(SongPhoto, 'base64');

        // Generate a unique file name
        const uniqueFileName = `${songId}-${Date.now()}.jpg`;

        // Define the file path
        const filePath = path.join(__dirname, 'uploads', uniqueFileName);

        // Write the image data to the file
        fs.writeFileSync(filePath, imageBuffer);

        // Update the song data with the file path
        const updatedSong = await Song.findByIdAndUpdate(songId, { title, artist, genre, SongPhoto: filePath }, { new: true });

        res.status(200).json(updatedSong);
        console.log("Song Edited Successfully!!");
    } catch (error) {
        console.error("Error Editing Song: ", error);
        res.status(500).json({ message: "Song Editing Error" });
    }
}


// Get songs by user
exports.getSongByUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find songs owned by the user
        const song = await Song.find({ owner: userId });

        if (!song) {
            return res.status(404).json({ message: "No Songs Found" });
        }

        res.status(200).json(song);
        console.log("Songs Found");
    } catch (error) {
        console.error("Error Editing Song: ", error);
        res.status(500).json({ message: "Song Editing Error" });
    }
}
