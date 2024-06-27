const express = require('express');
const multer = require('multer');

const upload = multer();
const router = express.Router();
const applicantController = require('../controllers/applicantController');

router.post('/api/applicant/', applicantController.createNewApplicant);
router.post('/api/applicant/fileupload',upload.single('file'), applicantController.uploadNewFile);
router.get('/api/applicant/get-signed-url', applicantController.getFileDownloadUrl); 

module.exports = router;

