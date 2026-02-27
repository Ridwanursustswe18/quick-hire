const applicationService = require('../services/application.service');

const submitApplication = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const userId = req.user?.id || null;
    const application = await applicationService.submitApplication(jobId, userId, req.body);
    res.status(201).json({ success: true, message: 'Application submitted successfully', data: application });
  } catch (err) {
    next(err);
  }
};


module.exports = {
  submitApplication,
};