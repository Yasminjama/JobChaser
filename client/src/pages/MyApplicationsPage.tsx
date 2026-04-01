// MyApplicationsPage.tsx
// min skyddade sida som visar användarens sparade jobbansökningar från backend
import { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import type { Application } from '../types/types';


function MyApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = useAuthStore((state) => state.token);

  // Hämta ansökningar från backend när sidan laddas
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/job-applications', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Kunde inte hämta ansökningar');
        }

        const data = await response.json();
        setApplications(data);
        setError(null);
      } catch (err) {
        setError('Något gick fel vid hämtning av ansökningar');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [token]);

  if (loading) {
    return <div className="app-container"><p>Laddar ansökningar...</p></div>;
  }

  if (error) {
    return <div className="app-container"><p>{error}</p></div>;
  }

  return (
    <div className="app-container">
      <h1>Mina ansökningar</h1>

      {applications.length === 0 ? (
        <p>Du har inga sparade ansökningar ännu.</p>
      ) : (
        <div className="job-list">
          {applications.map((app) => (
            <article key={app.id} className="job-item">
              <h2>{app.company}</h2>
              <h3>{app.jobTitle}</h3>
              <p>Status: {app.status}</p>
              <p>Ansökningsdatum: {new Date(app.appliedDate).toLocaleDateString('sv-SE')}</p>
              {app.notes && <p>{app.notes}</p>}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyApplicationsPage;