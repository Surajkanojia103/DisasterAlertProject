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
            // Fallback: Save to local file system
            console.log("Saving user to local file system...");

            const users = readLocalUsers();
            if (users.find(u => u.email === email)) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = {
                id: 'local-' + Date.now().toString(),
                name,
                email,
                password: hashedPassword,
                role: 'user',
                createdAt: new Date()
            };

            users.push(newUser);
            writeLocalUsers(users);

            const payload = {
                user: {
                    id: newUser.id,
                    role: newUser.role
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '24h' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token, user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } });
                }
            );
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper to read local users
const readLocalUsers = () => {
    try {
        if (!fs.existsSync(USERS_FILE)) {
            return [];
        }
        const data = fs.readFileSync(USERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading local users:", err);
        return [];
    }
};

// Helper to write local users
const writeLocalUsers = (users) => {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    } catch (err) {
        console.error("Error writing local users:", err);
    }
};

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Hardcoded Admin Login
        if (email === 'admin@123' || email === 'admin@123.com') {
            if (password === '12345678') {
                const payload = {
                    user: {
                        id: 'admin-id',
                        name: 'Administrator',
                        email: 'admin@123',
                        role: 'admin'
                    }
                };
                jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
                    if (err) throw err;
                    return res.json({
                        token,
                        user: { id: 'admin-id', name: 'Administrator', email: 'admin@123', role: 'admin' }
                    });
                });
                return;
            } else {
                return res.status(400).json({ message: 'Invalid Admin Credentials' });
            }
        }

        // Regular User Login
        try {
            let user = await User.findOne({ email });
            if (!user) {
                // Try looking in local file if not found in DB (or if DB connection is active but empty)
                throw new Error("User not found in DB, trying local");
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid Credentials' });
            }

            const payload = { user: { id: user.id, role: user.role } };
            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
            });

        } catch (dbError) {
            // DB Failed or User not found -> Check Local File System
            console.log("Checking local file system for user...");
            const users = readLocalUsers();
            const localUser = users.find(u => u.email === email);

            if (!localUser) {
                return res.status(400).json({ message: 'Invalid Credentials' });
            }

            const isMatch = await bcrypt.compare(password, localUser.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid Credentials' });
            }

            const payload = { user: { id: localUser.id, role: localUser.role } };
            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: localUser.id, name: localUser.name, email: localUser.email, role: localUser.role } });
            });
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
