const express = require('express');
const router = express.Router();
const NotiController = require('../controllers/notificationController.js');
router.get('/api/notifications', NotiController.getStudentNotification);
module.exports = router;