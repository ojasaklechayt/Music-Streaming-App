const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const {verifyjwt} = require("../middleware");

router.use(verifyjwt);
router.get('/',songController.getAllSongs);
router.get('/name',songController.getSongByName);
router.post('/',songController.uploadSong);
router.get('/artist',songController.getSongByArtist);
router.get('/genre', songController.getSongByGenre);

module.exports = router;