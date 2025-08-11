const mongoose = require('mongoose');

const parkReservationSchema = new mongoose.Schema({
  park: { type: String, required: true },
  date: { type: Date, required: true },
  reasons: { type: [String], required: true },  // array of strings
}, { timestamps: true });

module.exports = mongoose.model('ParkReservation', parkReservationSchema);
