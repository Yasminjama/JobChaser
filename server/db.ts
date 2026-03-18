// db.ts hanterar anslutningen till PostgreSQL-databasen
import { Pool } from 'pg';
import dotenv from 'dotenv';

// Ladda miljövariabler
dotenv.config();

// Skapa connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// för att testa anslutningen
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected database error:', err);
});

export default pool;