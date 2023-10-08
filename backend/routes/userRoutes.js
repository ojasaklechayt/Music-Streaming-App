// Import necessary modules and packages
const express = require('express'); // Import Express.js for routing
const router = express.Router(); // Create an instance of an Express router
const userController = require('../controllers/userController'); // Import the userController module
const { verifyjwt, logout } = require("../middleware"); // Import the verifyjwt middleware for authentication

// Define routes for user-related actions, including registration and login
// These routes do not require authentication

// Route to handle user registration
router.post('/register', userController.register);

// Route to handle user login
router.post('/login', userController.login);

// Apply the verifyjwt middleware to the routes below to ensure authentication is required
router.use(verifyjwt);

router.post('/logout', logout);
// Define routes that require authentication

// Route to update user profile information
router.put('/profile/update', userController.updateProfile);

// Route to get user profile information
router.get('/profile', userController.profile);

// Export the router with defined routes for use in other parts of the application
module.exports = router;
