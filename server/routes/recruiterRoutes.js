const express = require('express');
const router = express.Router();
const recruiterController = require('../controllers/recruiterController');

router.post('/api/recruiter/', recruiterController.createNewRecruiter);

module.exports = router;