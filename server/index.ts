import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './routes/users'; 
import jobApplicationsRouter from './routes/jobApplications'; 
import authRouter from './routes/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/job-applications', jobApplicationsRouter);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Root
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to JobChaser API' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});