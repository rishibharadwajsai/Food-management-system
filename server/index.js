const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'https://foodbookingapp.pages.dev'], // Include localhost and the specific URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods if needed
    credentials: true, // If you're using cookies, ensure credentials are allowed
}));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookings'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
