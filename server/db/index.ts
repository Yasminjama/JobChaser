//Exporterar databasanslutning till postgresql och wrappar den med drizzle-orm för att kunna använda den i resten av applikationen.
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import dotenv from 'dotenv';



dotenv.config()


const pool = new Pool ({
    connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });

