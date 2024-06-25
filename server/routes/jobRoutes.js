const express = require('express');
const router = express.Router();
const JobsController = require('../controllers/JobslistController.js');
router.get('/api/jobs/fulltimejobs', JobsController.getFullTimeJobs);
router.get('/api/jobs/parttimejobs', JobsController.getPartTimeJobs);
router.get('/api/jobs', JobsController.getJobsByRecruiterUid);
router.post('/api/jobs/newjobpost', JobsController.createNewJobPost);


module.exports = router;