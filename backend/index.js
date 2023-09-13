const express = require("express");
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

try {
    mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });

    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });
} catch (err) {
    console.error('An error occurred while connecting to MongoDB:', err);
}


// const userRoutes = require('./routes/userRoutes');
// const songRoutes = require('./routes/songRoutes');
// const playlistRoutes = require('./routes/playlistRoutes');

// app.use('/users', userRoutes);
// app.use('/songs', songRoutes);
// app.use('/playlists', playlistRoutes);

app.use('/',(req,res) => {
    res.send("Welcome to our music app");
})
app.listen(port, () => {
    console.log(`Server is running on the port ${port}`)
});
