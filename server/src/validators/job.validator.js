const {z} = require('zod');
jobSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    location: z.string().min(2, 'Location must be at least 2 characters').optional(),
    salary: z.number().positive('Salary must be a positive number').optional(),
    company: z.string().min(2, 'Company must be at least 2 characters'),
    employmentType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'TEMPORARY', 'INTERN']).optional(),
    experienceLevel: z.enum(['ENTRY', 'MID', 'SENIOR', 'LEAD']).optional(),
    remote: z.boolean().default(false).optional(),
    skills: z.array(z.string().min(2, 'Skill must be at least 2 characters')).optional(),
    category: z.string().min(2, 'Category must be at least 2 characters'),
});
module.exports = { jobSchema };