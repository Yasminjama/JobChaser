//filterStore.ts
//Global state för alla filter i appen. Håller koll på textfilter, region, anställningstyp och erfarenhetskrav.
import { create } from 'zustand';
import type { FilterStore } from '../types/types'; // 👈

export const useFilterStore = create<FilterStore>((set) => ({
  // Startvärden. Inga filter aktiverade
  textFilter: '',
  regionFilter: '',
  employmentType: '',
  requiresExperience: '',

  setTextFilter: (value) => set({ textFilter: value }),
  setRegionFilter: (value) => set({ regionFilter: value }),
  setEmploymentType: (value) => set({ employmentType: value }),
  setRequiresExperience: (value) => set({ requiresExperience: value }),

  clearFilters: () => set({
    textFilter: '',
    regionFilter: '',
    employmentType: '',
    requiresExperience: '',
  }),
}));