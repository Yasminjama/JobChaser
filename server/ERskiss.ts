// Skiss för serverfilen, där vi kommer att starta upp Express och sätta upp våra API endpoints.
//┌─────────────────┐         ┌──────────────────────┐
//│     USERS       │         │  JOB_APPLICATIONS    │
//├─────────────────┤         ├──────────────────────┤
//│ id (PK)         │───1:N───│ id (PK)              │
//│ name            │         │ user_id (FK)         │
//│ email (UNIQUE)  │         │ job_title            │
//│ password        │         │ company              │
//│ created_at      │         │ status               │
//└─────────────────┘         │ applied_date         │
 //                           │ notes                │
 //                           │ created_at           │
   //                         └──────────────────────┘

//RELATION: En user kan ha många job_applications
//          (one-to-many via user_id)