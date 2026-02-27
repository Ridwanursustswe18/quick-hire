const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const submitApplication = async (jobId, userId, data) => {
  const jobExists = await prisma.job.findUnique({ where: { id: parseInt(jobId) } });
  if (!jobExists) {
    const error = new Error('Job not found');
    error.status = 404;
    throw error;
  }

  if (userId) {
    const alreadyApplied = await prisma.application.findFirst({
      where: { jobId: parseInt(jobId), userId: parseInt(userId) },
    });
    if (alreadyApplied) {
      const error = new Error('You have already applied for this job');
      error.status = 409;
      throw error;
    }
  }

  const application = await prisma.application.create({
    data: {
      ...data,
      jobId: parseInt(jobId),
      userId: userId ? parseInt(userId) : null,
    },
    include: { job: { select: { title: true, company: true } } },
  });

  return application;
};


module.exports = {
  submitApplication,
  
};