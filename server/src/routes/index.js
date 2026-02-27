const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: 'QuickHire API v1' });
});
router.use('/auth', require('./auth.route'));
router.use('/jobs', require('./job.route'));
module.exports = router;