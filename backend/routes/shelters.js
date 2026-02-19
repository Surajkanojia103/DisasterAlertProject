const express = require('express');
const router = express.Router();
const Shelter = require('../models/Shelter');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');
const SHELTERS_FILE = path.join(DATA_DIR, 'shelters.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    try {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    } catch (err) {
        console.error("Error creating data directory:", err);
    }
}

// Initial Sample Data
const initialShelters = [
    {
        _id: 'sample-1',
        name: 'City Community Center',
        location: {
            lat: 40.7128,
            lng: -74.0060,
            address: '123 Main St, New York, NY'
        },
        capacity: 200,
        occupancy: 45,
        status: 'Open',
        contact: '+1 555-0101',
        facilities: ['Food', 'Water', 'Medical', 'Sleeping Area'],
        createdAt: new Date()
    },
    {
        _id: 'sample-2',
        name: 'Westside High School Gym',
        location: {
            lat: 40.7300,
            lng: -74.0100,
            address: '456 West Ave, New York, NY'
        },
        capacity: 500,
        occupancy: 120,
        status: 'Open',
        contact: '+1 555-0102',
        facilities: ['Water', 'Restrooms', 'Parking'],
        createdAt: new Date()
    },
    {
        _id: 'sample-3',
        name: 'East River Shelter',
        location: {
            lat: 40.7500,
            lng: -73.9800,
            address: '789 River Rd, New York, NY'
        },
        capacity: 150,
        occupancy: 150,
        status: 'Full',
        contact: '+1 555-0103',
        facilities: ['Food', 'Medical'],
        createdAt: new Date()
    }
];

// Helper to read local shelters
const readLocalShelters = () => {
    try {
        if (!fs.existsSync(SHELTERS_FILE)) {
            // Seed if empty
            writeLocalShelters(initialShelters);
            return initialShelters;
        }
        const data = fs.readFileSync(SHELTERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading local shelters:", err);
        return [];
    }
};

// Helper to write local shelters
const writeLocalShelters = (shelters) => {
    try {
        fs.writeFileSync(SHELTERS_FILE, JSON.stringify(shelters, null, 2));
    } catch (err) {
        console.error("Error writing local shelters:", err);
    }
};

const isDbConnected = () => mongoose.connection.readyState === 1;

// Get all shelters
router.get('/', async (req, res) => {
    if (isDbConnected()) {
        try {
            const shelters = await Shelter.find();
            if (shelters.length === 0) {
                // Return sample data if DB is empty to show something
                return res.json(initialShelters);
            }
            return res.json(shelters);
        } catch (err) {
            console.error(err.message);
            // Fallback to local
        }
    }

    console.log("Using file storage for GET /shelters");
    const shelters = readLocalShelters();
    res.json(shelters);
});

// Add a shelter (Admin or Volunteer?) - Let's allow authenticated users for now, maybe restrict later
router.post('/', auth, async (req, res) => {
    // Only admin can add shelters usually, but allowing volunteers for now
    if (req.user.role !== 'admin' && !req.user.isVolunteer) {
        // return res.status(403).json({ msg: 'Access denied' });
    }

    if (isDbConnected()) {
        try {
            const newShelter = new Shelter({
                ...req.body,
                createdBy: req.user.id
            });
            const shelter = await newShelter.save();
            return res.json(shelter);
        } catch (err) {
            console.error(err.message);
            // Fallback
        }
    }

    console.log("Using file storage for POST /shelters");
    const shelters = readLocalShelters();
    const newShelter = {
        _id: 'local-shelter-' + Date.now(),
        ...req.body,
        createdBy: req.user.id,
        createdAt: new Date()
    };
    shelters.push(newShelter);
    writeLocalShelters(shelters);
    res.json(newShelter);
});

// Update shelter
router.put('/:id', auth, async (req, res) => {
    if (isDbConnected()) {
        try {
            let shelter = await Shelter.findById(req.params.id);
            if (shelter) {
                shelter = await Shelter.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
                return res.json(shelter);
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    console.log("Using file storage for PUT /shelters/:id");
    const shelters = readLocalShelters();
    const index = shelters.findIndex(s => s._id === req.params.id || s.id === req.params.id);

    if (index !== -1) {
        shelters[index] = { ...shelters[index], ...req.body };
        writeLocalShelters(shelters);
        res.json(shelters[index]);
    } else {
        res.status(404).json({ msg: 'Shelter not found' });
    }
});

module.exports = router;
