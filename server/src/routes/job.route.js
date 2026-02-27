const express = require('express');
const router = express.Router();
const { createJob, getAllJobs, getJobById, deleteJob } = require('../controllers/job.controller');
const { protect, adminOnly } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { jobSchema } = require('../validators/job.validator');

router.get('/', getAllJobs);                                               
router.get('/:id', getJobById);                                           
router.post('/', protect, adminOnly, validate(jobSchema), createJob);
router.delete('/:id', protect, adminOnly, deleteJob);                     

module.exports = router;