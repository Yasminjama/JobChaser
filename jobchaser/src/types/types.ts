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
  logo_url: string | null;
  webpage_url: string;
  application_deadline: string;
  description: {
    text: string;
  };
}

