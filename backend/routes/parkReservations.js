const express = require('express');
const router = express.Router();
const { getReservations, addReservation, deleteReservation } = require('../controllers/parkReservationController');

// GET all or filtered reservations
router.get('/', getReservations);

// POST new reservation
router.post('/', addReservation);

// DELETE reservation by id
router.delete('/:id', deleteReservation);

module.exports = router;
