const jobService = require('../services/job.service');

const createJob = async (req, res, next) => {
  try {
    const job = await jobService.createJob(req.body);
    res.status(201).json({ success: true, message: 'Job created successfully', data: job });
  } catch (err) {
    next(err);
  }
};

const getAllJobs = async (req, res, next) => {
  try {
    const { search, category, location } = req.query;
    const jobs = await jobService.getAllJobs({ search, category, location });
    res.status(200).json({ success: true, count: jobs.length, data: jobs });
  } catch (err) {
    next(err);
  }
};

const getJobById = async (req, res, next) => {
  try {
    const job = await jobService.getJobById(req.params.id);
    res.status(200).json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    await jobService.deleteJob(req.params.id);
    res.status(200).json({ success: true, message: 'Job deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { createJob, getAllJobs, getJobById, deleteJob };