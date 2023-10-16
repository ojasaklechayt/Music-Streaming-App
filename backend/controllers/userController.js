// Import necessary models and packages
const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const { generatejwt } = require("../middleware");
// Controller functions for user-related actions

// Register a new user
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const saltRounds = 10;

        // Check if a user with the provided email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Generate a salt for password hashing
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash the provided password using the salt
        const encryptedPassword = await bcrypt.hash(password, salt);

        // Create a new user document with the provided data
        const newUser = new User({
            username,
            email,
            password: encryptedPassword
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user: ', error);
        res.status(500).json({ message: 'Registration failed' });
    }
}

// User login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find a user with the provided email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User Not Found' });
        }

        // Compare the provided password with the hashed password in the database
        const check = await bcrypt.compare(password, user.password);
        if (!check) {
            return res.status(401).json({ message: 'Wrong Password Given' });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        generatejwt(user, res);

        // console.log(Usertoken);
        res.status(200).json({ status: 'success', tokenData });
        // res.status(200).json({message:"Successfull"});
    } catch (error) {
        console.error('Error Login User: ', error);
        res.status(500).json({ message: 'Login failed' });
    }
};

// Fetch user profile
exports.profile = async (req, res) => {
    try {
        const _Id = req.user._id;

        // Find the user by their ID
        const user = await User.findOne({ _id: _Id });

        if (!user) {
            res.status(404).json({ message: "User Not Found!!" });
        }

        res.status(200).json({ user });

    } catch (error) {
        console.error("Error Fetching Profile: ", error);
        res.status(500).json({ message: 'Profile Retrieval Failed' });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    try {
        const { username, profilePicture, bio } = req.body;
        const userId = req.user._id;

        // Find the user by their ID
        const user = await User.findOne({ _id: userId });

        if (!user) {
            res.status(404).json({ message: 'User Not Found' });
        }

        // Update user data if provided
        if (username) user.username = username;
        if (profilePicture) user.profilePicture = profilePicture;
        if (bio) user.bio = bio;

        // Save the updated user data
        await user.save();

        res.status(200).json({ message: 'Profile Updated Successfully', user });
    } catch (error) {
        console.error("Error Updating Profile: ", error);
        res.status(500).json({ message: 'Profile Updation Failed' });
    }
};
