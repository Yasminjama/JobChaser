// jobApplications.ts 
// CRUD routes skyddade routes kräver JWT-token via authMiddleware

import { Router, Request, Response } from 'express';
import { db } from '../db/index';
import { jobApplications } from '../db/schema';
import { eq } from 'drizzle-orm';
import authMiddleware, { AuthRequest } from '../middleware/auth';

const router = Router();

// GET /job-applications hämta alla ansökningar (skyddad och visar bara egna)
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const allApplications = await db
      .select()
      .from(jobApplications)
      .where(eq(jobApplications.userId, req.user!.id));
    res.json(allApplications);
  } catch (error) {
    console.error('Error fetching job applications:', error);
    res.status(500).json({ error: 'Failed to fetch job applications' });
  }
});

// GET /job-applications/:id hämta en specifik ansökan (skyddad och visar bara egna)
router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const application = await db
      .select()
      .from(jobApplications)
      .where(eq(jobApplications.id, Number(id)));

    if (application.length === 0) {
      return res.status(404).json({ error: 'Job application not found' });
    }

    // Kontrollera att ansökan tillhör den inloggade användaren(kollar om userId matchar användaren)
    if (application[0].userId !== req.user!.id) {
      return res.status(403).json({ error: 'Not authorized to view this application' });
    }

    res.json(application[0]);
  } catch (error) {
    console.error('Error fetching job application:', error);
    res.status(500).json({ error: 'Failed to fetch job application' });
  }
});

// POST /job-applications skapa ny ansökan (skyddad och kräver token)
// userId hämtas automatiskt från token behöver inte skickas i body
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { jobTitle, company, status, appliedDate, notes } = req.body;
    console.log('Request body:', req.body);

    if (!jobTitle || !company || !appliedDate) {
      return res.status(400).json({ error: 'jobTitle, company and appliedDate are required' });
    }

    const newApplication = await db.insert(jobApplications).values({
      userId: req.user!.id, //och här hämtas automatiskt från JWT-token
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

// PUT /job-applications/:id uppdatera en ansökan (skyddad och kräver token)
router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
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

// PATCH /job-applications/:id uppdatera enskilda fält (skyddad och kräver token)
router.patch('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
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

// DELETE /job-applications/:id ta bort en ansökan (skyddad och kräver token)
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
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