const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Song',
    }],
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;