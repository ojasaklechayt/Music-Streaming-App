// Import the mongoose package for defining MongoDB schemas and models
const mongoose = require('mongoose');

// Define a schema for the 'Playlist' collection in MongoDB
const playlistSchema = new mongoose.Schema({
    // Define the 'name' field for the playlist with a String type
    name: {
        type: String,
        required: true, // The 'name' field is required
    },
    // Define the 'creator' field as a reference to a User object (ObjectId)
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the 'User' model
    },
    // Define the 'songs' field as an array of references to Song objects (ObjectIds)
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song', // Reference to the 'Song' model
    }],
});

// Create a 'Playlist' model using the defined schema
const Playlist = mongoose.model('Playlist', playlistSchema);

// Export the 'Playlist' model for use in other parts of the application
module.exports = Playlist;
