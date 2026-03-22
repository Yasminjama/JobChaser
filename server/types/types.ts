//Backend type

export interface User {
    id: number;
    name: string;
    email: string;
    password: string; 
    created_at: string;
}

//Job application från databasen. 
export interface JobApplication {
  id: number;
  user_id: number;
  job_title: string;
  company: string;
  status: 'applied' | 'interview' | 'rejected' | 'accepted';
  applied_date: Date;
  notes?: string;
}

//För att skapa ny användare
export interface CreateUserInput {
    name: string;
    email: string;
    password: string;
}

//För att skapa en ny jobb ansökan
export interface CreateJobApplicationInput {
  user_id: number;
  job_title: string;
  company: string;
  status: 'applied' | 'interview' | 'rejected' | 'accepted';
  applied_date: Date;
  notes?: string;
}
