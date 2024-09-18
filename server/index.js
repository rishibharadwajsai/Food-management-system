const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: ['*', 'https://foodbookingapp.pages.dev'] // Replace with your frontend URL
}));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookings'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
