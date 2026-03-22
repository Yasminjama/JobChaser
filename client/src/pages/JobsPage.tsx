//Vi flyttar App.tsx nu till JobsPage.tsx. App.tsx kommer nu fungera som router och rendera JobsPage när vi är på rätt path.
import { useState, useEffect } from 'react';
import JobList from "../components/JobList";
import type { Job } from '../types/types';

function JobsPage () {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(""); 
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  // useEffect används för att hantera sidoeffekter i React-komponenter, som att hämta data från en API.
  // I det här fallet används useEffect för att hämta jobbdata när komponenten först renderas.
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        // Hämta 100 jobb utan regions-filter från 
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
  
  // Filtrera jobb baserat på sökterm OCH vald region
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.employer.name.toLowerCase().includes(searchTerm.toLowerCase());
    
      // Om en region är vald kontrollera att jobbets region matchar den valda regionen. Om ingen region är vald, inkludera alla jobb.
    const matchesRegion = selectedRegion 
      ? job.workplace_address.region === selectedRegion 
      : true;
    
    return matchesSearch && matchesRegion;
  });
  
  if (loading) {
    return <div className="app-container"><p>Laddar jobb...</p></div>;
  }
  
  if (error) {
    return <div className="app-container"><p>{error}</p></div>;
  }
  
  return (
    <div className="app-container">
      <h1>JobChaser</h1>
      
      <div className="filters">
        <input
          type="text"
          placeholder="Sök efter jobb..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select 
          value={selectedRegion} 
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="">Alla regioner</option>
          <option value="Stockholms län">Stockholms län</option>
          <option value="Västra Götalands län">Västra Götalands län</option>
          <option value="Skåne län">Skåne län</option>
          <option value="Uppsala län">Uppsala län</option>
          <option value="Östergötlands län">Östergötlands län</option>
          <option value="Hallands län">Hallands län</option>
          <option value="Jönköpings län">Jönköpings län</option>
          <option value="Dalarnas län">Dalarnas län</option>
          <option value="Södermanlands län">Södermanlands län</option>
        </select>
      </div>
      
      <p>Visar {filteredJobs.length} jobb</p>
      
      <JobList jobs={filteredJobs} />
    </div>
  );
}

export default JobsPage;