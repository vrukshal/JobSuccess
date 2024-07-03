const express = require('express');
const router = express.Router();
const applicationsController = require('../controllers/applicationsController');
const multer = require('multer');

const upload = multer();

router.post('/api/application/', applicationsController.createApplication);
router.get('/api/application/', applicationsController.getApplicants);

// router.post('/api/recruiter/fileupload',upload.single('file'),recruiterController.uploadNewFile);
// router.get('/api/recruiter/files',recruiterController.getFiles);
// router.get('/api/recruiter/get-signed-url', recruiterController.getFileDownloadUrl); 
// router.get('/api/recruiter/view-url', recruiterController.getFileViewUrl); // New endpoint

module.exports = router;