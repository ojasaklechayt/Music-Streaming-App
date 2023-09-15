// Import the mongoose package for defining MongoDB schemas and models
const mongoose = require('mongoose');

// Define a schema for the 'Token' collection in MongoDB
const tokenSchema = mongoose.Schema({
    // Define the 'token' field for the token document with a String type
    token: {
        type: String,
        required: true, // The 'token' field is required
    }
});

// Create a 'Token' model using the defined schema
const Token = mongoose.model('Token', tokenSchema);

// Export the 'Token' model for use in other parts of the application
module.exports = Token;
