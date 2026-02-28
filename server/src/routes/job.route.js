const express = require('express');
const router = express.Router();
const { createJob, getAllJobs, getJobById, deleteJob } = require('../controllers/job.controller');
const { protect, adminOnly } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { jobSchema } = require('../validators/job.validator');
const { createApplicationSchema } = require('../validators/application.validator');
const { submitApplication } = require('../controllers/application.controller');

router.get('/', getAllJobs);                                               
router.get('/:id', getJobById);                                           
router.post('/',  validate(jobSchema), createJob);
router.post('/:jobId/applications', validate(createApplicationSchema), submitApplication);
router.delete('/:id', deleteJob);                     

module.exports = router;