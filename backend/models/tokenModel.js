const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true,
    }
    });

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;