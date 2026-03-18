//Kör denna fil en gång för att sätta upp databasen och skapa tabellerna. 
import pool from './db';

async function setupDatabase() {
  try {
    console.log('🔧 Setting up database tables...');

    // Skapa users-tabell
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('Users table created');

    // Skapa job_applications-tabell
    await pool.query(`
      CREATE TABLE IF NOT EXISTS job_applications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        job_title VARCHAR(200) NOT NULL,
        company VARCHAR(200) NOT NULL,
        status VARCHAR(50) CHECK (status IN ('applied', 'interview', 'rejected', 'accepted')),
        applied_date DATE NOT NULL,
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log(' Job_applications table created');

    console.log('Database setup complete!');
    process.exit(0);
  } catch (error) {
    console.error('Database setup error:', error);
    process.exit(1);
  }
}

setupDatabase();