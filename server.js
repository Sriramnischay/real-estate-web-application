const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from root
app.use(express.static(path.join(__dirname)));

// API Routes (Placeholders for now)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/properties', require('./routes/properties'));

// Catch-all route to serve index.html for non-API requests
app.get(/.*/, (req, res) => {
    // Check if request is for an API route to avoid returning HTML for 404 API calls
    if (req.url.startsWith('/api')) {
        return res.status(404).json({ message: 'API Route not found' });
    }
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
