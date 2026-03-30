// För hantering av autentisering dvs registering och inloggning av användare
// När användaren loggar in eller registrerar sig och det är en lyckad inloggning så skickas en JWT token tillbaka.

console.log('auth.ts laddades!');

import { Router, Request, Response } from 'express';
import { db } from '../db/index';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

// Test route
router.get('/test', (req: Request, res: Response) => {
  res.json({ message: 'Auth works!' });
});

// POST /auth/signup skapa ny användare
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    }).returning();

    res.status(201).json({ message: 'User created', user: { id: newUser[0].id, name: newUser[0].name, email: newUser[0].email } });
  } catch (error: any) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// POST /auth/signin logga in användare
router.post('/signin', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await db.select().from(users).where(eq(users.email, email));

    if (user.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user[0].password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user[0].id, email: user[0].email },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    );

    //Skickar nu med user objektet så frontend kan spara det i authStore
    res.json({ 
      message: 'Logged in successfully', 
      token,
      user: {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email
      }
    });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ error: 'Failed to sign in' });
  }
});

export default router;