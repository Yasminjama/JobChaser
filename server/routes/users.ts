// Hanterar alla HTTP requests relaterade till användare (users).
// Använder Drizzle ORM för databasoperationer
// Här kan en lägga till endpoints för att hämta användare, skapa nya användare, uppdatera användare, etc.
import { Router, Request, Response } from 'express';
import { db } from '../db/index';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

const router = Router();

// GET /users - Hämta alla användare
router.get('/', async (req: Request, res: Response) => {
  try {
    const allUsers = await db.select().from(users);
    res.json(allUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET /users/:id för att hämta en specifik användare
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await db.select().from(users).where(eq(users.id, Number(id)));

    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// POST /users  för att skapa ny användare
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }

    const newUser = await db.insert(users).values({ name, email, password }).returning();

    res.status(201).json(newUser[0]);
  } catch (error: any) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// DELETE /users/:id för att ta bort användare
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedUser = await db.delete(users).where(eq(users.id, Number(id))).returning();

    if (deletedUser.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted', user: deletedUser[0] });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;