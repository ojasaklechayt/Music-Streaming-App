const Song = require('../models/songModel');
const User = require('../models/userModel');
exports.getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        res.status(200).json({ songs });
    } catch (error) {
        console.error('Error Fetching All The Songs: ', error);
        res.status(500).json({ message: "Error Fetching All The Songs" })
    }
}

exports.getSongByName = async (req, res) => {
    try {
        const { name } = req.body;
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

exports.uploadSong = async (req, res) => {
    try {
        const { title, artist, genre, audioURL, id } = req.body;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        const newSong = await Song({
            title,
            artist,
            genre,
            audioURL
        });

        await newSong.save();

        user.uploadedSongs.push(newSong._id);
        await user.save();

        res.status(201).json({ message: "Song Uploaded Successfully", song: newSong, user: user });
    } catch (error) {
        console.error("Error Uploading Data: ", error);
        res.status(500).json({ message: "Error Uploading Data" });
    }
}

exports.getSongByArtist = async (req, res) => {
    try {
        const { Artist } = req.query;
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

exports.getSongByGenre = async (req, res) => {
    try {
        const { Genre } = req.body;
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