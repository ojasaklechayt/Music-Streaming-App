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
        const { title, artist, genre, audioURL, owner } = req.body;

        const user = await User.findById(owner);

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        const newSong = await Song({
            title,
            artist,
            genre,
            audioURL,
            owner
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

exports.deleteSong = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log(userId);
        const songID = req.params.songId;
        console.log(songID);
        const song = await Song.findById(songID);
        console.log(songID);

        if (!song) {
            return res.status(404).json({ message: "Song Not Found" });
        };

        console.log(song.artist);
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        };

        const songowner = await User.find(song._id);
        console.log(songowner.id);

        if (song.owner.toString() !== userId.toString()) {
            return res.status(403).json("Unauthorized: You are not the owner of this playlist");
        }

        user.uploadedSongs.pull(songID);
        await user.save();

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
        const { title, artist, genre } = req.body;
        const userId = req.body.userId;

        const song = await Song.findById(songId);

        if (!song) {
            return res.status(404).json({ message: "Song Not Found" });
        }

        if (song.owner.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized: You are not the owner of this song" });
        }

        const updatedSong = await Song.findByIdAndUpdate(songId, { title, artist, genre }, { new: true });

        res.status(200).json(updatedSong);
        console.log("Song Edited Successfully!!");
    } catch (error) {
        console.error("Error Editing Song: ", error);
        res.status(500).json({ message: "Song Editing Error" });
    }
}

exports.getSongByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const song = await Song.find({owner: userId});

        if(!song){
            return res.status(404).json({message:"No Songs Found"});
        }

        res.status(200).json(song);
        console.log("Songs Found");
    } catch (error) {
        console.error("Error Editing Song: ", error);
        res.status(500).json({ message: "Song Editing Error" });
    }
}