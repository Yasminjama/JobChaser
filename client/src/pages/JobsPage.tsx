// Vi flyttar App.tsx nu till JobsPage.tsx. App.tsx kommer nu fungera som router och rendera JobsPage när vi är på rätt path.
import { useState, useEffect } from 'react';
import JobList from "../components/JobList";
import FilterPanel from '../components/FilterPanel';
import Pagination from '../components/Pagination';
import { useFilterStore } from '../stores/filterStore';
import { useJobApplicationStore } from '../stores/jobApplicationStore';
import type { Job } from '../types/types';

const JOBS_PER_PAGE = 12; 

function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Hämta filter från storen istället för lokalt state
  const { textFilter, regionFilter, employmentType, requiresExperience } = useFilterStore();

  // Hämta sparade ansökningar från backend när komponenten laddas
  const fetchApplications = useJobApplicationStore((state) => state.fetchApplications);

  // useEffect används för att hantera sidoeffekter i React-komponenter, som att hämta data från en API.
  // I det här fallet används useEffect för att hämta jobbdata när komponenten först renderas.
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        // Hämta 100 jobb utan regions-filter
        const response = await fetch('https://jobsearch.api.jobtechdev.se/search?limit=100');
        
        if (!response.ok) {
          throw new Error('Kunde inte hämta jobb');
        }
        
        const data = await response.json();
        setJobs(data.hits);
        setError(null);
      } catch (err) {
        setError('Något gick fel vid hämtning av jobb');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, []); // Hämta bara en gång

  // Hämta sparade ansökningar från backend när komponenten laddas
  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Filtrera jobb baserat på alla filter från storen
  const filteredJobs = jobs.filter((job) => {
    // Fritextsökning på titel och företagsnamn
    const matchesText =
      job.headline.toLowerCase().includes(textFilter.toLowerCase()) ||
      job.employer.name.toLowerCase().includes(textFilter.toLowerCase());

    // Om en region, anställningstyp eller erfarenhetskrav är valt, kontrollera att jobbet matchar.
    const matchesRegion = regionFilter
      ? job.workplace_address.region === regionFilter
      : true;

    const matchesEmploymentType = employmentType
      ? job.employment_type?.label === employmentType
      : true;

    const matchesExperience = requiresExperience !== ''
      ? String(job.experience_required) === requiresExperience
      : true;

    return matchesText && matchesRegion && matchesEmploymentType && matchesExperience;
  });

  // Räkna ut antal sidor baserat på filtrerade jobb
  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);

  // Hämta bara de jobb som ska visas på den aktuella sidan
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );

  // När filter ändras, gå tillbaka till sida 1
  useEffect(() => {
    setCurrentPage(1);
  }, [textFilter, regionFilter, employmentType, requiresExperience]);

  if (loading) {
    return <div className="app-container"><p>Laddar jobb...</p></div>;
  }

  if (error) {
    return <div className="app-container"><p>{error}</p></div>;
  }

  return (
    <div className="app-container">
      <h1>JobChaser</h1>

      {/* FilterPanel ersätter de gamla inputsen och hämtar filter från filterStore */}
      <FilterPanel />

      <p>Visar {filteredJobs.length} jobb</p>

      <JobList jobs={paginatedJobs} />

      {/* Visa pagination bara om det finns mer än en sida */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

export default JobsPage;