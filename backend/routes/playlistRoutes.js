const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
const {verifyjwt} = require("../middleware");

router.use(verifyjwt);
router.post("/", playlistController.createPlaylist);
router.put("/:id", playlistController.editPlaylist);
router.delete("/:id", playlistController.deletePlaylist);
router.post("/:id/song", playlistController.addSongToPlaylist)
router.delete("/:id/delete/:songId", playlistController.removeSongFromPlaylist);
router.get("/user/:userId", playlistController.findPlaylistsByUser);
router.get("/", playlistController.getAllPlaylists);
router.get("/:id", playlistController.getPlaylistbyId);
router.get("/:id/song",playlistController.getAllSongsFromPlaylist);
module.exports = router;