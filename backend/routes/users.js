const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   GET api/users/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/users/profile
// @desc    Update profile (Skills, Location, etc.)
// @access  Private
router.put('/profile', auth, async (req, res) => {
    const { name, business_name, skills, location, gst_number } = req.body;

    // Build profile object
    const profileFields = {};
    if (name) profileFields.name = name;
    if (business_name) profileFields.business_name = business_name;
    if (gst_number) profileFields.gst_number = gst_number;
    if (skills) {
        // Ensure skills is array
        profileFields.skills = Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim());
    }
    if (location) profileFields.location = location;

    try {
        let user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: profileFields },
            { new: true }
        ).select('-password');

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
