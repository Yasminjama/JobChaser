//JobItem is where we define how each job item should look like. It receives a job object as a prop and renders the information about the job in a structured way.
//Props are the information that you pass to a JSX tag when you create an element.
//So think of them as the attributes of an HTML element?
import type { Job } from '../types/types';

interface JobItemProps {
  job: Job;
}

function JobItem({ job }: JobItemProps) {
  return (
    <article className="job-item">
      {job.logo_url && <img src={job.logo_url} alt={`${job.employer.name} logo`} />}
      <h2>{job.employer.name}</h2>
      <h3>{job.headline}</h3>
      <p>
        {job.workplace_address.municipality} - {job.employment_type.label}
      </p>
      <p>Sista ansökningsdag: {new Date(job.application_deadline).toLocaleDateString('sv-SE')}</p> {/* Convert the application deadline to a more readable format */}
      <a href={job.webpage_url} target="_blank" rel="noopener noreferrer">
        Läs mer →
      </a>
    </article>
  );
}

export default JobItem;