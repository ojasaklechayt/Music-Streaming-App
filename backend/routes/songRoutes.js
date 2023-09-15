const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const {verifyjwt} = require("../middleware");

router.use(verifyjwt);
router.get('/',songController.getAllSongs);
router.get('/name',songController.getSongByName);
router.get('/artist',songController.getSongByArtist);
router.get('/genre', songController.getSongByGenre);
router.post('/',songController.uploadSong);
//delete song
//edit song
//get songs by user
module.exports = router;