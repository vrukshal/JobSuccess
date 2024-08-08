const express = require('express');
const multer = require('multer');

const upload = multer();
const router = express.Router();
const applicantController = require('../controllers/applicantController');

router.post('/api/applicant/', applicantController.createNewApplicant);
router.post('/api/applicant/fileupload',upload.single('file'), applicantController.uploadNewFile);
router.get('/api/applicant/get-signed-url', applicantController.getFileDownloadUrl); 
router.get('/api/applicant/:studentUid', applicantController.getApplicant);
router.patch('/api/applicant/:studentUid', applicantController.updateApplicant);

router.get('/api/applicant/uploadResume/:studentUid', applicantController.updateApplicantResumeData);

module.exports = router;

