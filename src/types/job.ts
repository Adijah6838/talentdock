export interface Job {
  id: string;
  title: string;
  company: string;
  publishedDate: string;
  openings: number;
  skills: string[];
  salaryMin: number;
  salaryMax: number;
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
  experienceLevel: 'Entry Level' | 'Mid Level' | 'Senior Level';
  location: string;
  isRemote: boolean;
  category: string;
  description: string;
  qualifications: string[];
  responsibilities: string[];
  deadline: string;
}