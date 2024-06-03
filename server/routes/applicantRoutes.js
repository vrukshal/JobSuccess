const express = require('express');
const router = express.Router();
const applicantController = require('../controllers/applicantController');

router.post('/api/applicant/', applicantController.createNewApplicant);

module.exports = router;

