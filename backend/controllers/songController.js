const Song = require('../models/songModel');

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
        const song = await Song.findOne({ title: name });

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
        const { title, artist, genre, audioURL } = req.body;

        const newSong = await Song({
            title,
            artist,
            genre,
            audioURL
        });

        await newSong.save();

        res.status(201).json({ message: "Song Uploaded Successfully", song: newSong });
    } catch (error) {
        console.error("Error Uploading Data: ", error);
        res.status(500).json({ message: "Error Uploading Data" });
    }
}

exports.getSongByArtist = async (req, res) => {
    try {
        const { artist } = req.body;
        const song = await Song.find({ artist });

        if (!song || song.length === 0) {
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
        const { genre } = req.body;
        const song = await Song.find({ genre });

        if (!song || song.length === 0) {
            return res.status(404).json({ song: [] });
        }
        res.status(200).json({ song });
    } catch (error) {
        console.error("Error Fetching Specific Songs by Genre: ", error);
        res.status(500).json({ message: "Error Fetching Specific Songs by Genre" });
    }
}