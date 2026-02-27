const { z } = require('zod');

const createApplicationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  resumeLink: z.string().url('Resume link must be a valid URL'),
  coverNote: z.string().min(10, 'Cover note must be at least 10 characters').optional(),
});

module.exports = { createApplicationSchema };