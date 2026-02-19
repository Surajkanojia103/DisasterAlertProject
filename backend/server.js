const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debugging: Check what URI is being used
const dbUri = process.env.MONGO_URI;
console.log("---------------------------------------------------");
console.log("Attempting to connect to MongoDB...");
if (dbUri) {
    const maskedUri = dbUri.replace(/(mongodb(?:\+srv)?:\/\/[^:]+:)([^@]+)(@.+)/, '$1****$3');
    console.log("Target URI:", maskedUri);
} else {
    console.error("CRITICAL ERROR: MONGO_URI is undefined in .env file");
}
console.log("---------------------------------------------------");

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => {
        console.error("MongoDB Connection Error:");
        console.error(err);
    });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/alerts', require('./routes/alerts'));
app.use('/api/shelters', require('./routes/shelters'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
