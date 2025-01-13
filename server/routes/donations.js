const express = require('express');
const router = express.Router();
const { createDonation } = require('../controllers/donationsController');

router.post('/donate', createDonation);

module.exports = router; 