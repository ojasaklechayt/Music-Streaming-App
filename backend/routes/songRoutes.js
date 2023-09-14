const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const {verifyjwt} = require("../middleware");

router.use(verifyjwt);

module.exports = router;