// Import necessary packages and modules
const express = require("express"); // Express.js for building the web application
require('dotenv').config(); // Load environment variables from a .env file
const mongoose = require('mongoose'); // MongoDB ORM for database interaction
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const cors = require('cors'); // Middleware for handling Cross-Origin Resource Sharing (CORS)
const port = process.env.PORT || 5000; // Port on which the server will run
const app = express(); // Create an instance of the Express application
const cookieParser = require('cookie-parser') // Middleware for parsing cookies

app.set("trust proxy", 1);
// Use middleware to parse JSON request bodies
// app.use(bodyParser.json());
// Enable CORS to allow cross-origin requests
app.use(cors({
    origin: true, // included origin as true
    credentials: true,//included credentials as true
    exposedHeaders: ["Authorization"],
}));

// Use middleware to parse cookies
app.use(cookieParser());

try {
    // Connect to MongoDB using the URL provided in the .env file
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    // Event handlers for MongoDB connection
    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });
} catch (err) {
    // Handle any errors that occur during MongoDB connection
    console.error('An error occurred while connecting to MongoDB:', err);
}

// Import routes for different parts of the application
const userRoutes = require('./routes/userRoutes');
const songRoutes = require('./routes/songRoutes');
const playlistRoutes = require('./routes/playlistRoutes');

// Use routes and apply CORS middleware to specific routes
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use('/users', userRoutes);
app.use('/songs', songRoutes);
app.use('/playlists', playlistRoutes);

// Define a default route that responds with a welcome message
app.use('/', cors(), (req, res) => {
    res.send("Welcome to our music app");
})

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on the port ${port}`)
});
