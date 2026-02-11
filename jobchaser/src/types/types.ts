export interface Job {
    id: number;
    company: string;
    logo: string;
    position: string;
    role: string;
    level: string;
    postedAt: string;
    contract: string;
    location: string;
    languages: string[];
    tools: string[];
} // [] means  array of strings, not just one string

