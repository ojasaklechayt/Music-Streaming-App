// Import necessary modules and packages
const express = require('express'); // Import Express.js for routing
const router = express.Router(); // Create an instance of an Express router
const playlistController = require('../controllers/playlistController'); // Import the playlistController module
const { verifyjwt } = require("../middleware"); // Import the verifyjwt middleware for authentication

// Apply the verifyjwt middleware to all routes defined in this router
router.use(verifyjwt);

// Define various routes and their corresponding controller functions
// These routes are related to managing playlists

// Route to create a new playlist
router.post("/", playlistController.createPlaylist);

// Route to edit an existing playlist by its ID
router.put("/:id", playlistController.editPlaylist);

// Route to delete a playlist by its ID
router.delete("/:id", playlistController.deletePlaylist);

// Route to add a song to a playlist by playlist ID
router.post("/:id/song", playlistController.addSongToPlaylist);

// Route to remove a song from a playlist by playlist ID and song ID
router.delete("/:id/delete/:songId", playlistController.removeSongFromPlaylist);

// Route to find playlists by user ID
router.get("/user/:userId", playlistController.findPlaylistsByUser);

// Route to get all playlists
router.get("/", playlistController.getAllPlaylists);

// Route to get a playlist by its ID
router.get("/:id", playlistController.getPlaylistbyId);

// Route to get all songs from a playlist by playlist ID
router.get("/:id/song", playlistController.getAllSongsFromPlaylist);

// Export the router with defined routes for use in other parts of the application
module.exports = router;
