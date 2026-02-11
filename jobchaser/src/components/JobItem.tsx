//JobItem is where we define how each job item should look like. It receives a job object as a prop and renders the information about the job in a structured way.
//Props are the information that you pass to a JSX tag when you create an element.
//So think of them as the attributes of an HTML element?
import type { Job } from '../types/types';

interface JobItemProps {
    job: Job; // Job type imported from types.ts
}



function JobItem({ job }: JobItemProps) {
    //Here we return to JSX that represents a job item.
    return (
        <article>
            {/* We can access the properties of the job object using dot notation. */}
            <img src={job.logo} alt={`${job.company} logo`} />
            <h2>{job.company}</h2>
            <h3>{job.position}</h3>
            <p>{job.postedAt} - {job.contract} - {job.location}</p>
            <p>Role: {job.role}</p>
            <p>Level: {job.level}</p>
            <p>Languages: {job.languages.join(", ")}</p>
            <p>Tools: {job.tools.join(", ")}</p>
        </article>
    );
}

export default JobItem; 