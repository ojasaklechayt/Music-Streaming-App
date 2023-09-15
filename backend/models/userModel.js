// Import the mongoose package for defining MongoDB schemas and models
const mongoose = require('mongoose');

// Define a schema for the 'User' collection in MongoDB
const userSchema = new mongoose.Schema({
    // Define the 'username' field for the user with a String type
    username: {
        type: String,
        required: true, // The 'username' field is required
        unique: true,  // The 'username' field must be unique
    },
    // Define the 'email' field for the user with a String type
    email: {
        type: String,
        required: true, // The 'email' field is required
        unique: true,  // The 'email' field must be unique
    },
    // Define the 'password' field for the user with a String type
    password: {
        type: String,
        required: true, // The 'password' field is required
    },
    // Define the 'profilePicture' field for the user with an optional String type
    profilePicture: String,
    // Define the 'bio' field for the user with an optional String type
    bio: String,
    // Define the 'createdPlaylists' field as an array of references to Playlist objects (ObjectIds)
    createdPlaylists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist', // Reference to the 'Playlist' model
    }],
    // Define the 'uploadedSongs' field as an array of references to Song objects (ObjectIds)
    uploadedSongs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song', // Reference to the 'Song' model
    }]
});

// Create a 'User' model using the defined schema
const User = mongoose.model('User', userSchema);

// Export the 'User' model for use in other parts of the application
module.exports = User;
