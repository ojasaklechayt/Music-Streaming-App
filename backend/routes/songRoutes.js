// Import necessary modules and packages
const express = require('express'); // Import Express.js for routing
const router = express.Router(); // Create an instance of an Express router
const songController = require('../controllers/songController'); // Import the songController module
const { verifyjwt } = require("../middleware"); // Import the verifyjwt middleware for authentication
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Apply the verifyjwt middleware to all routes defined in this router
router.use(verifyjwt);

// Define various routes and their corresponding controller functions
// These routes are related to managing songs

// Route to get all songs
router.get('/', songController.getAllSongs);

// Route to get songs by name
router.get('/name', songController.getSongByName);

// Route to get songs by artist
router.get('/artist', songController.getSongByArtist);

// Route to get songs by genre
router.get('/genre', songController.getSongByGenre);

// Route to upload a new song
router.post('/', upload.single('audio'), songController.uploadSong);

// Route to delete a song by user ID and song ID
router.delete('/:userId/:songId', songController.deleteSong);

// Route to edit a song by song ID
router.put('/editsong/:songId', songController.editSong);

// Route to get songs by user ID
router.get('/:userId', songController.getSongByUser);

// Export the router with defined routes for use in other parts of the application
module.exports = router;
