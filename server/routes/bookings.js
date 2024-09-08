const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ msg: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ msg: 'Forbidden' });
        req.user = user;
        next();
    });
};

router.use(authenticateToken);

router.post('/', async (req, res) => {
    const { mealType, meal, date } = req.body;

    try {
        const { userId } = req.user;

        // Generate a unique reference token
        const referenceToken = crypto.randomBytes(16).toString('hex');

        // Determine today's date and get the highest order number for today
        const todayStart = new Date().setHours(0, 0, 0, 0); // Midnight of today

        // Find the latest booking for today to get the highest order number
        const latestBooking = await Booking.findOne({
            date: { $gte: todayStart }
        }).sort({ orderNumber: -1 });

        const newOrderNumber = latestBooking ? latestBooking.orderNumber + 1 : 1;

        const newBooking = new Booking({
            userId,
            mealType,
            meal,
            date,
            referenceToken,
            orderNumber: newOrderNumber
        });

        await newBooking.save();
        res.json({
            msg: 'Meal booked successfully',
            orderNumber: newOrderNumber,
            referenceToken
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
