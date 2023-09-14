const Playlist = require('../models/playlistModel');
const Song = require('../models/songModel');
const User = require('../models/userModel');

exports.createPlaylist = async (req, res) => {
    try {
        const { name, id, songs } = req.body;
        
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        const newPlaylist = new Playlist({
            name,
            creator:id,
            songs: songs || []
        });

        await newPlaylist.save();


        user.createdPlaylists.push(newPlaylist._id);
        await user.save();

        res.status(201).json(newPlaylist);
    } catch (error) {
        console.error("Error Creating Playlist: ", error);
        res.status(500).json({ message: "Error Creating Playlist" });
    }
};


exports.editPlaylist = async (req, res) => {
    try {
        const { name, id } = req.body;
        const playlistId = req.params.id;

        const playlist = await Playlist.findById(playlistId);
        const users = await User.find();
        if (!playlist) {
            return res.status(404).json({ message: "Playlist Not Found" });
        }
        console.log(playlist.creator.toString());
        console.log(id.toString());
        if (playlist.creator.toString() !== id.toString()) {
            return res.status(403).json({ message: "Unauthorized: You are not the owner of this playlist" });
        }

        if (name) {
            playlist.name = name;
        }

        await playlist.save();
        res.status(200).json({playlist});
    } catch (error) {
        console.error("Error Editing Playlist: ", error);
        res.status(500).json({ message: "Error Editing Playlist" });
    }
};

exports.deletePlaylist = async (req, res) => {
    try {
        const playlistId = req.params.id;
        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: "Playlist Not Found" });
        }

        const userId = playlist.creator;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        user.createdPlaylists.pull(playlistId);
        await user.save();

        await playlist.remove();

        res.status(204).end();
        console.log("Playlist Deleted Successfully!!");
    } catch (error) {
        console.error("Error Deleting Playlist: ", error);
        res.status(500).json({ message: "Error Deleting Playlist" });
    }
};

exports.addSongToPlaylist = async (req, res) => {
    try {
        const { songId } = req.body;
        const playlistId = req.params.id;

        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: "Playlist Not Found" });
        }

        const song = await Song.findById(songId);

        if (!song) {
            return res.status(404).json({ message: "Song Not Found" });
        }
        
        playlist.songs.push(song);
        await playlist.save();
        res.status(200).json(playlist);
    } catch (error) {
        console.error("Error Adding Songs To The Playlist: ", error);
        res.status(500).json({ message: "Error Adding Songs To The Playlist" });
    }
};


exports.removeSongFromPlaylist = async (req, res) => {
    try {
        const playlistId = req.params.id;
        const songId = req.params.songId;

        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: "Playlist Not Found " });
        }

        const song = await Song.findById(songId);

        if (!song) {
            return res.status(404).json({ message: "Song Not Found" });
        }

        playlist.songs.pull(songId);
        await playlist.save();

        res.status(200).json(playlist);
    } catch (error) {
        console.error("Error Deleting Songs From The Playlist: ", error);
        res.status(500).json({ message: "Error Deleting Songs From The Playlist" });
    }
};

exports.findPlaylistsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const playlists = await Playlist.find({ creator: userId });

        res.status(200).json(playlists);
        console.log("Here're The Playlists");
    } catch (error) {
        console.error('Error Fetching Playlists For User: ', error);
        res.status(500).json({ message: "Error Fetching Playlists For User" });
    }
};