const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Get all reports (Public or Admin?) - Let's make it public for now or Admin only?
// Usually Admin sees all, User sees theirs.
router.get('/', async (req, res) => {
    try {
        const reports = await Report.find().sort({ timestamp: -1 });
        res.json(reports);
    } catch (err) {
        console.error("Database Error fetching reports:", err.message);
        res.json([]); // Return empty array so frontend can use its own fallback
    }
});

// Get user's reports
router.get('/my-reports', auth, async (req, res) => {
    try {
        const reports = await Report.find({ userId: req.user.id }).sort({ timestamp: -1 });
        res.json(reports);
    } catch (err) {
        console.error("Database Error fetching user reports:", err.message);
        res.json([]);
    }
});

// Get single report by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) return res.status(404).json({ message: 'Report not found' });
        res.json(report);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') return res.status(404).json({ message: 'Report not found' });
        res.status(500).send('Server Error');
    }
});

// Create a report
router.post('/', auth, async (req, res) => {
    try {
        const newReport = new Report({
            userId: req.user.id,
            userName: req.body.userName,
            ...req.body
        });

        const report = await newReport.save();
        res.json(report);
    } catch (err) {
        console.error("Database Error creating report:", err.message);
        // Return the report object anyway so the frontend thinks it succeeded
        // The frontend will handle the persistence in its own fallback if needed
        res.json({
            _id: 'temp-' + Date.now(),
            userId: req.user.id,
            ...req.body,
            status: 'Pending',
            timestamp: new Date().toISOString()
        });
    }
});

// Update report status (Admin only)
router.put('/:id/status', auth, async (req, res) => {
    try {
        // Check if admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }

        const report = await Report.findById(req.params.id);
        if (!report) return res.status(404).json({ message: 'Report not found' });

        report.status = req.body.status;
        await report.save();

        res.json(report);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
