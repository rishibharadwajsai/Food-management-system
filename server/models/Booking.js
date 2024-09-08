const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    mealType: { type: String, required: true },
    meal: { type: String, required: true },
    date: { type: Date, required: true },
    referenceToken: { type: String, required: true },
    orderNumber: { type: Number, required: true },
    status: { type: String, default: 'Pending' },
    timestamp: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;
