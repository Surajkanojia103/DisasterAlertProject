const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    disasterType: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Critical'],
        default: 'Medium'
    },
    affected: {
        type: String
    },
    needs: {
        type: String
    },
    contact: {
        type: String
    },
    status: {
        type: String,
        enum: ['Pending', 'Verified', 'Rejected', 'Resolved'],
        default: 'Pending'
    },
    isStuck: {
        type: Boolean,
        default: false
    },
    shelterRequest: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Report', reportSchema);
