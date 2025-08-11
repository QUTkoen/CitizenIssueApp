const ParkReservation = require('../models/ParkReservation');

// Get all reservations, optionally filtered by park via query param
const getReservations = async (req, res) => {
  try {
    const { park } = req.query;
    const filter = park ? { park } : {};
    const reservations = await ParkReservation.find(filter).sort({ date: 1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new reservation
const addReservation = async (req, res) => {
  try {
    const { park, date, reasons } = req.body;

    if (!park || !date || !reasons || !Array.isArray(reasons) || reasons.length === 0) {
      return res.status(400).json({ message: 'Missing or invalid fields' });
    }

    const newReservation = await ParkReservation.create({ park, date, reasons });
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing reservation by ID
const updateReservation = async (req, res) => {
  try {
    const reservation = await ParkReservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });

    Object.assign(reservation, req.body);
    const updatedReservation = await reservation.save();
    res.json(updatedReservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a reservation by ID
const deleteReservation = async (req, res) => {
  try {
    const reservation = await ParkReservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });

    await reservation.remove();
    res.json({ message: 'Reservation deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getReservations, addReservation, updateReservation, deleteReservation };
