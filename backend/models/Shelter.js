const mongoose = require('mongoose');

const shelterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
        address: { type: String, required: true }
    },
    capacity: {
        type: Number,
        required: true
    },
    occupancy: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['Open', 'Full', 'Closed'],
        default: 'Open'
    },
    contact: {
        type: String,
        required: true
    },
    facilities: [{
        type: String
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Shelter', shelterSchema);
