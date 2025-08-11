const express = require('express');
const router = express.Router();
const { getReservations, addReservation, deleteReservation } = require('../controllers/parkReservationController');

// GET all or filtered reservations
router.get('/park-reservations', getReservations);

// POST new reservation
router.post('/park-reservations', addReservation);

// DELETE reservation by id
router.delete('/park-reservations/:id', deleteReservation);

module.exports = router;
