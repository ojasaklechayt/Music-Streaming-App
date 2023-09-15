// Import the mongoose package for defining MongoDB schemas and models
const mongoose = require('mongoose');

// Define a schema for the 'Song' collection in MongoDB
const songSchema = new mongoose.Schema({
    // Define the 'title' field for the song with a String type
    title: {
        type: String,
        required: true, // The 'title' field is required
    },
    // Define the 'artist' field for the song with a String type
    artist: {
        type: String,
        required: true, // The 'artist' field is required
    },
    // Define the 'genre' field for the song with a String type
    genre: {
        type: String,
        required: true, // The 'genre' field is required
    },
    // Define the 'audioURL' field for the song with a String type
    audioURL: {
        type: String,
        required: true, // The 'audioURL' field is required
    },
    // Define the 'owner' field as a reference to a User object (ObjectId)
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the 'User' model
        required: true, // The 'owner' field is required
    }
});

// Create a 'Song' model using the defined schema
const Song = mongoose.model('Song', songSchema);

// Export the 'Song' model for use in other parts of the application
module.exports = Song;
