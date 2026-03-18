import { Router, Request, Response } from 'express';
import pool from '../db';

const router = Router();

// GET /job-applications - Hämta alla ansökningar
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM job_applications ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching job applications:', error);
    res.status(500).json({ error: 'Failed to fetch job applications' });
  }
});

// GET /job-applications/:id - Hämta en specifik ansökan
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM job_applications WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Job application not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching job application:', error);
    res.status(500).json({ error: 'Failed to fetch job application' });
  }
});

// POST /job-applications - Skapa ny ansökan
router.post('/', async (req: Request, res: Response) => {
  try {
    const { user_id, job_title, company, status, applied_date, notes } = req.body;

    if (!user_id || !job_title || !company || !applied_date) {
      return res.status(400).json({ error: 'user_id, job_title, company and applied_date are required' });
    }

    const result = await pool.query(
      `INSERT INTO job_applications (user_id, job_title, company, status, applied_date, notes)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [user_id, job_title, company, status || 'applied', applied_date, notes || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating job application:', error);
    res.status(500).json({ error: 'Failed to create job application' });
  }
});

// PUT /job-applications/:id - Uppdatera en ansökan
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { job_title, company, status, applied_date, notes } = req.body;

    if (!job_title || !company || !applied_date) {
      return res.status(400).json({ error: 'job_title, company and applied_date are required' });
    }

    const result = await pool.query(
      `UPDATE job_applications
       SET job_title = $1, company = $2, status = $3, applied_date = $4, notes = $5
       WHERE id = $6
       RETURNING *`,
      [job_title, company, status, applied_date, notes, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Job application not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating job application:', error);
    res.status(500).json({ error: 'Failed to update job application' });
  }
});

// DELETE /job-applications/:id - Ta bort en ansökan
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM job_applications WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Job application not found' });
    }

    res.json({ message: 'Job application deleted', jobApplication: result.rows[0] });
  } catch (error) {
    console.error('Error deleting job application:', error);
    res.status(500).json({ error: 'Failed to delete job application' });
  }
});

export default router;