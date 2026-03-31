// jobApplicationStore.ts
// Hanterar sparande av jobbansökningar till backend
import { create } from 'zustand';
import { useAuthStore } from './authStore';

interface JobApplicationStore {
  savedJobIds: string[];
  fetchApplications: () => Promise<void>;
  addApplication: (jobId: string, jobTitle: string, company: string) => Promise<void>;
}

export const useJobApplicationStore = create<JobApplicationStore>((set) => ({
  savedJobIds: [],

  // Hämta sparade ansökningar från backend och extrahera JobTech-id från notes
  fetchApplications: async () => {
    const token = useAuthStore.getState().token;
    if (!token) return; // inte inloggad, gör ingenting

    try {
      const response = await fetch('http://localhost:3000/job-applications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) return;

      const applications = await response.json();

      // Vi sparade JobTech-id i notes som "JobTech ID: abc123"
      // Nu plockar vi ut dem så vi vet vilka jobb som redan är sparade
      const ids = applications
        .map((app: { notes: string | null }) => {
          if (!app.notes) return null;
          const match = app.notes.match(/JobTech ID: (.+)/);
          return match ? match[1] : null;
        })
        .filter(Boolean) as string[];

      set({ savedJobIds: ids });
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  },

  addApplication: async (jobId, jobTitle, company) => {
    const token = useAuthStore.getState().token;

    try {
      const response = await fetch('http://localhost:3000/job-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          jobTitle,
          company,
          status: 'applied',
          appliedDate: new Date().toISOString().split('T')[0],
          notes: `JobTech ID: ${jobId}`
        })
      });

      if (!response.ok) throw new Error('Kunde inte spara ansökan');

      // Lägg till jobId i savedJobIds så knappen uppdateras direkt
      set((state) => ({ savedJobIds: [...state.savedJobIds, jobId] }));
    } catch (error) {
      console.error('Error saving application:', error);
    }
  }
}));