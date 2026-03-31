//JobItem is where we define how each job item should look like. It receives a job object as a prop and renders the information about the job in a structured way.
//Props are the information that you pass to a JSX tag when you create an element.
//So think of them as the attributes of an HTML element?
// JobItem — renderar ett jobbkort med en "Spara ansökan"-knapp
import type { Job } from '../types/types';
import { useJobApplicationStore } from '../stores/jobApplicationStore';
import { useAuthStore } from '../stores/authStore';

interface JobItemProps {
  job: Job;
}

function JobItem({ job }: JobItemProps) {
  const addApplication = useJobApplicationStore((state) => state.addApplication);
  const savedJobIds = useJobApplicationStore((state) => state.savedJobIds);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Kolla om jobbet redan är sparat
  const isSaved = savedJobIds.includes(job.id);

  const handleSave = () => {
    addApplication(job.id, job.headline, job.employer.name);
  };

  return (
    <article className="job-item">
      {job.logo_url && <img src={job.logo_url} alt={`${job.employer.name} logo`} />}
      <h2>{job.employer.name}</h2>
      <h3>{job.headline}</h3>
      <p>
        {job.workplace_address.municipality} - {job.employment_type.label}
      </p>
      <p>Sista ansökningsdag: {new Date(job.application_deadline).toLocaleDateString('sv-SE')}</p>
      <a href={job.webpage_url} target="_blank" rel="noopener noreferrer">
        Läs mer →
      </a>

      {/* Visa knappen bara om användaren är inloggad */}
      {isAuthenticated && (
        <button
          onClick={handleSave}
          disabled={isSaved}
          className={isSaved ? 'save-btn saved' : 'save-btn'}
        >
          {isSaved ? '✓ Sparad' : ' Spara ansökan'}
        </button>
      )}
    </article>
  );
}

export default JobItem;