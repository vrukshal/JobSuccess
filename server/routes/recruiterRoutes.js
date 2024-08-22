const express = require('express');
const router = express.Router();
const recruiterController = require('../controllers/recruiterController');
const multer = require('multer');

const upload = multer();

router.post('/api/recruiter/', recruiterController.createNewRecruiter);
router.post('/api/recruiter/fileupload',upload.single('file'),recruiterController.uploadNewFile);
router.get('/api/recruiter/files',recruiterController.getFiles);
router.get('/api/recruiter/get-signed-url', recruiterController.getFileDownloadUrl); 
router.get('/api/recruiter/view-url', recruiterController.getFileViewUrl); // New endpoint
router.get('/api/recruiter/recruiterlist', recruiterController.getRecruiterList); // New endpoint
router.get('/api/recruiter/resumescore', recruiterController.getResumeScore);
module.exports = router;