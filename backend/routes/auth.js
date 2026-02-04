const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        try {
            // Check if user exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create user
            user = new User({
                name,
                email,
                password: hashedPassword
            });

            await user.save();

            // Create token
            const payload = {
                user: {
                    id: user.id,
                    role: user.role
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '24h' },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            gender: user.gender,
                            contact: user.contact
                        }
                    });
                }
            );
        } catch (dbError) {
            console.error("Database Error during signup:", dbError.message);
            res.status(500).json({ message: 'Server Error during signup. Database might be unavailable.' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Hardcoded Admin Login (Bypass DB for reliability during demo)
        if ((email === 'admin@123' || email === 'admin@123.com') && password === '12345678') {
            const payload = {
                user: {
                    id: 'admin-id',
                    name: 'Administrator',
                    email: 'admin@123',
                    role: 'admin'
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '24h' },
                (err, token) => {
                    if (err) throw err;
                    return res.json({
                        token,
                        user: { id: 'admin-id', name: 'Administrator', email: 'admin@123', role: 'admin' }
                    });
                }
            );
            return; // Stop execution here
        }

        // Regular User Login
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid Credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid Credentials' });
            }

            const payload = {
                user: {
                    id: user.id,
                    role: user.role
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '24h' },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            gender: user.gender,
                            contact: user.contact
                        }
                    });
                }
            );
        } catch (dbError) {
            console.error("Database Error during login:", dbError.message);
            res.status(500).json({ message: 'Server Error during login. Database might be unavailable.' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

const auth = require('../middleware/auth');

// Update Profile
router.put('/profile', auth, async (req, res) => {
    try {
        const { name, gender, contact } = req.body;

        let user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (name) user.name = name;
        if (gender) user.gender = gender;
        if (contact) user.contact = contact;

        await user.save();

        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                gender: user.gender,
                contact: user.contact
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
