const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: String,
    bio: String,
    createdPlaylists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist',
    }],
    uploadedSongs:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;