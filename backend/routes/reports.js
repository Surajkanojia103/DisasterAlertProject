const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const DATA_DIR = path.join(__dirname, '../data');
const DATA_FILE = path.join(DATA_DIR, 'reports.json');

// Ensure data directory calls
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper to read local reports
const readLocalReports = () => {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            return [];
        }
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading local reports:", err);
        return [];
    }
};

// Helper to write local reports
const writeLocalReports = (reports) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(reports, null, 2));
    } catch (err) {
        console.error("Error writing local reports:", err);
    }
};

const auth = require('../middleware/auth');

const isDbConnected = () => mongoose.connection.readyState === 1;

// Get all reports with Pagination
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    if (isDbConnected()) {
        try {
            const reports = await Report.find()
                .sort({ timestamp: -1 })
                .skip(skip)
                .limit(limit);

            const total = await Report.countDocuments();

            return res.json({
                reports,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalReports: total
            });
        } catch (err) {
            console.error("Database Error fetching reports:", err.message);
        }
    }

    console.log("Using file storage for GET /");
    const allReports = readLocalReports();
    // Sort by date descending
    allReports.sort((a, b) => new Date(b.timestamp || b.date) - new Date(a.timestamp || a.date));

    const startIndex = skip;
    const endIndex = page * limit;
    const paginatedReports = allReports.slice(startIndex, endIndex);

    res.json({
        reports: paginatedReports,
        currentPage: page,
        totalPages: Math.ceil(allReports.length / limit),
        totalReports: allReports.length
    });
});

// Get user's reports
router.get('/my-reports', auth, async (req, res) => {
    if (isDbConnected()) {
        try {
            const reports = await Report.find({ userId: req.user.id }).sort({ timestamp: -1 });
            return res.json(reports);
        } catch (err) {
            console.error("Database Error fetching user reports:", err.message);
        }
    }

    console.log("Using file storage for GET /my-reports");
    const allReports = readLocalReports();
    const userReports = allReports
        .filter(r => r.userId === req.user.id)
        .sort((a, b) => new Date(b.timestamp || b.date) - new Date(a.timestamp || a.date));
    res.json(userReports);
});

// Get single report by ID
router.get('/:id', auth, async (req, res) => {
    if (isDbConnected()) {
        try {
            const report = await Report.findById(req.params.id);
            if (report) return res.json(report);
        } catch (err) {
            // DB error or not found
        }
    }

    console.log("Using file storage for GET /:id");
    const allReports = readLocalReports();
    const report = allReports.find(r => r._id === req.params.id || r.id === req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });
    res.json(report);
});

const User = require('../models/User');

// ... (existing imports)

// Create a report
router.post('/', auth, async (req, res) => {
    let userName = req.body.userName;

    if (isDbConnected()) {
        try {
            const user = await User.findById(req.user.id);
            if (user) {
                userName = user.name;
            }
        } catch (err) {
            console.error("Error fetching user for report:", err.message);
        }
    }

    const reportData = {
        userId: req.user.id,
        userName: userName || 'Anonymous',
        ...req.body,
        status: 'Pending',
        timestamp: new Date().toISOString()
    };

    if (isDbConnected()) {
        try {
            const newReport = new Report(reportData);
            const report = await newReport.save();
            return res.json(report);
        } catch (err) {
            console.error("Database Error creating report:", err.message);
        }
    }

    console.log("Using file storage for POST /");

    const allReports = readLocalReports();
    const newReport = {
        _id: 'local-' + Date.now() + Math.random().toString(36).substr(2, 9),
        ...reportData
    };

    allReports.push(newReport);
    writeLocalReports(allReports);

    res.json(newReport);
});

// Update report status (Admin only)
router.put('/:id/status', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    if (isDbConnected()) {
        try {
            const report = await Report.findById(req.params.id);
            if (report) {
                report.status = req.body.status;
                await report.save();
                return res.json(report);
            }
        } catch (err) {
            // Fallthrough
        }
    }

    console.log("Using file storage for PUT /status");

    const allReports = readLocalReports();
    const reportIndex = allReports.findIndex(r => r._id === req.params.id || r.id === req.params.id);

    if (reportIndex === -1) {
        return res.status(404).json({ message: 'Report not found' });
    }

    allReports[reportIndex].status = req.body.status;
    writeLocalReports(allReports);

    res.json(allReports[reportIndex]);
});

module.exports = router;
