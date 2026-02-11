const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
    try {
        const { phone, role, name, business_name, gst_number, skills, location } = req.body;
        
        // Check if user exists
        let user = await User.findOne({ phone });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ phone, role, name, business_name, gst_number, skills, location });
        
        // Encrypt password (using phone as password for MVP demo)
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(phone, salt); // In prod, use OTP logic

        await user.save();

        // Return JWT
        const payload = { user: { id: user.id, role: user.role } };
        jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { phone } = req.body; // In prod, verify OTP here

        let user = await User.findOne({ phone });
        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

        // Grant Token
        const payload = { user: { id: user.id, role: user.role } };
        jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
