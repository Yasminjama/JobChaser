//Job interface
export interface Job {
  id: string;
  headline: string;
  employer: {
    name: string;
    workplace?: string;
  };
  workplace_address: {
    municipality: string;
    region: string;
  };
  employment_type: {
    label: string;
  };
  experience_required: boolean;
  logo_url: string | null;
  webpage_url: string;
  application_deadline: string;
  description: {
    text: string;
  };
}

//interface för att hantera formulärdata i SignUpPage
export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

// Interface för formulärdata i SignInPage
export interface SignInFormData {
  email: string;
  password: string;
}

//Typen för en inloggad användare
export interface User {
  id: number;
  email: string;
  name: string;
}

//typen för authStore som hanterar autentiseringstillståndet i appen
export interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void; //anropas vid inloggning
  logout: () => void; //anropas vid utloggning
}

// Interface för filterStore som hanterar alla filter i appen
export interface FilterStore {
  textFilter: string;
  regionFilter: string;
  employmentType: string;
  requiresExperience: string;

  setTextFilter: (value: string) => void;
  setRegionFilter: (value: string) => void;
  setEmploymentType: (value: string) => void;
  setRequiresExperience: (value: string) => void;
  clearFilters: () => void;
}

//Pagination props interface
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

