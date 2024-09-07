const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your client's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add any additional methods you need
    allowedHeaders: ['Content-Type', 'Authorization'], // Add any additional headers you need
};

// Use CORS middleware with the options
app.use(cors(corsOptions));

app.use(express.json());


// Define routes
app.get('/api/endpoint', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
