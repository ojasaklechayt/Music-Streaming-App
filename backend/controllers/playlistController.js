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
            creator: id,
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
        const { name, userId } = req.body;
        const playlistId = req.params.id;

        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({ message: "Playlist Not Found" });
        }
        if (!userId || typeof userId !== 'string') {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        console.log(playlist.creator.toString());
        console.log(userId);
        if (playlist.creator.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized: You are not the owner of this playlist" });
        }

        if (name) {
            playlist.name = name;
        }

        await playlist.save();
        res.status(200).json({ playlist });
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

        if (playlist.creator.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized: You are not the owner of this playlist" });
        }
        
        user.createdPlaylists.pull(playlistId);
        await user.save();

        await Playlist.deleteOne({ _id: playlistId });

        res.status(204).end({ message: "Playlist Deleted Successfully!!" });
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

        const songExistsInPlaylist = playlist.songs.some((playlistSong) =>
            playlistSong.equals(song._id)
        );

        if (songExistsInPlaylist) {
            return res.status(400).json({ message: "Song already exists in the playlist" });
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

exports.getAllPlaylists = async (req,res) => {
    try {
        const playlists = await Playlist.find();

        if(!playlists || playlists.length === 0){
            return res.status(404).json({message:"No Playlist Found"});
        }

        res.status(200).json(playlists);
    } catch (error) {
        console.error('Error Getting All The Playlist: ', error);
        res.status(500).json({message: "Error Getting All The Playlists"});
    }
};

exports.getPlaylistbyId = async(req,res) => {
    try {
        const playlistId = req.params.id;

        const playlist = await Playlist.find({playlistId});

        if(!playlist || playlist.length === 0){
            return res.status(404).json({message: "No Playlist Found by ID"});
        }

        res.status(200).json(playlist);
    } catch (error) {
        console.error('Error Fetching Specific Playlist: ', error);
        res.status(500).json({message:"Error Fetching Specific Playlist"});
    }
};

exports.getAllSongsFromPlaylist = async(req,res) => {
    try {
        const playlistId = req.params.id;
        const playlist = await Playlist.findById(playlistId);

        if(!playlist){
            return res.status(404).json({ message: "Playlist Not Found" });
        }

        const songs = await Song.find({ _id: {$in: playlist.songs} });

        res.status(200).json(songs);
    } catch (error) {
        console.error('Error Fetching Songs From Playlist: ', error);
        res.status(500).json({message:"Error Fetching Songs From Playlist"});
    }
};