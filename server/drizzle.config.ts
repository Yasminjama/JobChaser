import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

//schema - pekar på schema.ts så drizzle vet hur tabellerna ser ut
//out - mappen där drizzle sparar migrationsfilerna 
//dialect - talar om att vi använder postgresql
//dbCredentials - anslutningsuppgifter hämtade från .env filen. 
