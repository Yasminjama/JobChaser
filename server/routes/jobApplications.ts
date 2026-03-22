import { Router, Request, Response } from 'express';
import { db } from '../db/index';
import { jobApplications } from '../db/schema';
import { eq } from 'drizzle-orm';

const router = Router();

// GET /job-applications för att hämta alla ansökningar

router.get('/', async (req: Request, res: Response) => {
  try {
    const allApplications = await db.select().from(jobApplications);
    res.json(allApplications);
  } catch (error) {
    console.error('Error fetching job applications:', error);
    res.status(500).json({ error: 'Failed to fetch job applications' });
  }
});

// GET /job-applications/:id för att hämta en specifik ansökan
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const application = await db.select().from(jobApplications).where(eq(jobApplications.id, Number(id)));

    if (application.length === 0) {
      return res.status(404).json({ error: 'Job application not found' });
    }

    res.json(application[0]);
  } catch (error) {
    console.error('Error fetching job application:', error);
    res.status(500).json({ error: 'Failed to fetch job application' });
  }
});

// POST /job-applications för att skapa en ny ansökan
router.post('/', async (req: Request, res: Response) => {
  try {
   const { userId, jobTitle, company, status, appliedDate, notes } = req.body;
    console.log('Request body:', req.body);

    if (!userId || !jobTitle || !company || !appliedDate) {
      return res.status(400).json({ error: 'userId, jobTitle, company and appliedDate are required' });
    }

    const newApplication = await db.insert(jobApplications).values({
      userId,
      jobTitle,
      company,
      status: status || 'applied',
      appliedDate,
      notes: notes || null,
    }).returning();

    res.status(201).json(newApplication[0]);
  } catch (error) {
    console.error('Error creating job application:', error);
    res.status(500).json({ error: 'Failed to create job application' });
  }
});

// PUT /job-applications/:id  för att uppdatera en ansökan
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { jobTitle, company, status, appliedDate, notes } = req.body;

    if (!jobTitle || !company || !appliedDate) {
      return res.status(400).json({ error: 'jobTitle, company and appliedDate are required' });
    }

    const updatedApplication = await db.update(jobApplications).set({
      jobTitle,
      company,
      status,
      appliedDate,
      notes,
    }).where(eq(jobApplications.id, Number(id))).returning();

    if (updatedApplication.length === 0) {
      return res.status(404).json({ error: 'Job application not found' });
    }

    res.json(updatedApplication[0]);
  } catch (error) {
    console.error('Error updating job application:', error);
    res.status(500).json({ error: 'Failed to update job application' });
  }
});

// PATCH /job-applications/:id för att uppdatera enskilda fält
router.patch('/:id', async (req: Request, res: Response) => {
  console.log('PATCH route hit', req.params, req.body);
  try {
    const { id } = req.params;
    const { jobTitle, company, status, appliedDate, notes } = req.body;

    const fieldsToUpdate: Partial<typeof jobApplications.$inferInsert> = {};
    if (jobTitle !== undefined) fieldsToUpdate.jobTitle = jobTitle;
    if (company !== undefined) fieldsToUpdate.company = company;
    if (status !== undefined) fieldsToUpdate.status = status;
    if (appliedDate !== undefined) fieldsToUpdate.appliedDate = appliedDate;
    if (notes !== undefined) fieldsToUpdate.notes = notes;

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    const updatedApplication = await db
      .update(jobApplications)
      .set(fieldsToUpdate)
      .where(eq(jobApplications.id, Number(id)))
      .returning();

    if (updatedApplication.length === 0) {
      return res.status(404).json({ error: 'Job application not found' });
    }

    res.json(updatedApplication[0]);
  } catch (error) {
    console.error('Error patching job application:', error);
    res.status(500).json({ error: 'Failed to update job application' });
  }
});

// DELETE /job-applications/:id för att ta bort en ansökan
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedApplication = await db.delete(jobApplications).where(eq(jobApplications.id, Number(id))).returning();

    if (deletedApplication.length === 0) {
      return res.status(404).json({ error: 'Job application not found' });
    }

    res.json({ message: 'Job application deleted', jobApplication: deletedApplication[0] });
  } catch (error) {
    console.error('Error deleting job application:', error);
    res.status(500).json({ error: 'Failed to delete job application' });
  }
});

export default router;