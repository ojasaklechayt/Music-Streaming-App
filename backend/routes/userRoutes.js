const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register',userController.register);
router.post('/login',userController.login);
router.put('/profile/update',userController.updateProfile);
router.get('/profile', userController.profile);

module.exports = router;