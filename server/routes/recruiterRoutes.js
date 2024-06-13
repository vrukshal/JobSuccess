const express = require('express');
const router = express.Router();
const recruiterController = require('../controllers/recruiterController');
const multer = require('multer');

const upload = multer();

router.post('/api/recruiter/', recruiterController.createNewRecruiter);
router.post('/api/recruiter/fileupload',upload.single('file'),recruiterController.uploadNewFile);
router.get('/api/recruiter/files',recruiterController.getFiles);

module.exports = router;