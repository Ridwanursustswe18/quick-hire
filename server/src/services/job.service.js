const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createJob = async (data) => {
  const job = await prisma.job.create({ data });
  return job;
};

const getAllJobs = async ({ search, category, location }) => {
  const jobs = await prisma.job.findMany({
    where: {
      AND: [
        search
          ? {
              OR: [
                { title: { contains: search, mode: 'insensitive' } },
                { company: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {},
        category ? { category: { contains: category, mode: 'insensitive' } } : {},
        location ? { location: { contains: location, mode: 'insensitive' } } : {},
      ],
    },
    orderBy: { createdAt: 'desc' },
  });
  return jobs;
};

const getJobById = async (id) => {
  const job = await prisma.job.findUnique({
    where: { id: parseInt(id) },
    include: { applications: true },
  });

  if (!job) {
    const error = new Error('Job not found');
    error.status = 404;
    throw error;
  }
  return job;
};

const deleteJob = async (id) => {
  const job = await prisma.job.findUnique({ where: { id: parseInt(id) } });

  if (!job) {
    const error = new Error('Job not found');
    error.status = 404;
    throw error;
  }

  await prisma.job.delete({ where: { id: parseInt(id) } });
  return job;
};

module.exports = { createJob, getAllJobs, getJobById, deleteJob };