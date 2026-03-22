//Detta är vår serverfil som startar upp Express och sätter upp våra API endpoints. 
import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './routes/users'; 
import jobApplicationsRouter from './routes/jobApplications'; 

//Här laddar vi in miljövariabler från .env-filen
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


//Middleware
app.use(cors()); //tillåter resquest från frontend
app.use(express.json()); //parsar JSON i request body

//Test route for PATCH requests. 
app.patch('/test', (req: Request, res: Response) => {
  res.json({ message: 'PATCH works' });
});

//Routes 
app.use('/users', usersRouter); //Alla requests till `/users` går till usersRouter: 
app.use('/job-applications', jobApplicationsRouter);

// Testa databasanslutning vid start
//pool.query('SELECT NOW()', (err, res) => {
  //if (err) {
    //console.error('❌ Database connection error:', err);
  //} else {
   // console.log('Connected to PostgreSQL database');
    //console.log('Database time:', res.rows[0].now);
  //}
//});

//Health check route
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Server is running'});
});

//Root route
app.get ('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to JobChaser API'});
});


//Startar servern
app.listen (PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});