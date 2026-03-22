//Här definieras tabeller (users,job_applications) med drizzle syntax. Alltså hur databasen ska se ut.
import { pgTable, serial, varchar, text, date, timestamp, integer} from 'drizzle-orm/pg-core';


//exporterar users-tabellen
//varchar betyder att det är en textsträng, integer är ett heltal. Serial betyder att det är en auto-incrementing integer som används som primärnyckel.
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name', {length:200}).notNull(),
    email: varchar ('email', {length:200}).notNull().unique(),
    password: varchar('password', {length:200}).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});



//exporterar job_applications-tabellen
//references betyder att user_id i job_applications-tabellen refererar till id i users-tabellen, 
// och onDelete: 'cascade' betyder att om en användare tas bort så tas alla deras job applications också bort.
 export const jobApplications = pgTable('job_applications', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id, { onDelete: 'cascade'}),
    jobTitle: varchar('job_title', { length: 200}).notNull(),
    company: varchar('company', {length:200}).notNull(),
    status: varchar('status', {length: 50}).default('applied'),
    appliedDate: date('applied_date').notNull(),
    notes: text('notes'),
    createdAt: timestamp('created_at').defaultNow(),
 });