export interface Application {
  id: string;
  jobId: string;
  fullName: string;
  email: string;
  phone: string;
  title: string;
  experience: string;
  skills: string;
  portfolio: string;
  coverLetter: string;
  appliedDate: string;
  status: 'Submitted' | 'Under Review' | 'Shortlisted' | 'Rejected';
}