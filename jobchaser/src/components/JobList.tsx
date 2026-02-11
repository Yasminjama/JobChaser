//JobList is responsible for rendering a list of JobItem components.    
//  It receives an array of job objects as a prop and maps over that array to create a JobItem for each job.
//  If the list of jobs is empty, it displays a message indicating that there are no jobs available.
import type { Job } from '../types/types';
import JobItem from './JobItem';

interface JobListProps {
    jobs: Job[];
}

function JobList({ jobs }: JobListProps) {
    //Here we check if the list is empty
    if (jobs.length === 0) {
        return <p>Inga jobb</p>
    }

    return (
        <div>
            {jobs.map((job) => (
                <JobItem key={job.id} job={job} />
            ))}
        </div>
    );
}

export default JobList;