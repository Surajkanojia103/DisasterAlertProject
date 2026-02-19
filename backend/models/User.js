const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other', 'Prefer not to say'],
        default: 'Prefer not to say'
    },
    contact: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    isVolunteer: {
        type: Boolean,
        default: false
    },
    skills: [{
        type: String
    }],
    volunteerStatus: {
        type: String,
        enum: ['none', 'pending', 'approved', 'rejected'],
        default: 'none'
    },
    profession: {
        type: String,
        default: ''
    },
    experience: {
        type: String,
        default: ''
    },
    reason: {
        type: String,
        default: ''
    },
    availability: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
