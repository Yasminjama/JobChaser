// Hanterar alla HTTP requests relaterade till användare (users).
// Här kan vi lägga till endpoints för att hämta användare, skapa nya användare, uppdatera användare, etc.
import { Router, Request, Response } from 'express';
import pool from '../db';

const router = Router();

// GET /users - Hämta alla användare
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT id, name, email, created_at FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET /users/:id - Hämta en specifik användare
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT id, name, email, created_at FROM users WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});


// POST /users skapa ny användare
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    
    // Validering
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }
    
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
      [name, email, password]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    // Kolla om email redan finns
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});


// PUT /users/:id - Uppdatera en användare
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    // Validering
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Uppdatera användaren
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email, created_at',
      [name, email, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error: any) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// DELETE /users/:id för att ta bort en användare
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING id, name, email',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted', user: result.rows[0] });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});
export default router;