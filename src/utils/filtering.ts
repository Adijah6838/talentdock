import type { Job } from '../types/job';

export interface FilterOptions {
  search: string;
  category: string;
  minSalary: number;
  experienceLevel: string;
  jobType: string;
  isRemote: boolean | null;
  datePosted: string;
}

export function filterJobs(jobs: Job[], filters: FilterOptions): Job[] {
  return jobs.filter((job) => {
    // 1. Search (Title, Company, Skills, Category)
    const searchLower = filters.search.toLowerCase();
    const matchesSearch =
      job.title.toLowerCase().includes(searchLower) ||
      job.company.toLowerCase().includes(searchLower) ||
      job.skills.some((s) => s.toLowerCase().includes(searchLower)) ||
      job.category.toLowerCase().includes(searchLower);

    // 2. Category
    const matchesCategory = filters.category === 'All' || job.category === filters.category;

    // 3. Salary (checks if the job's max salary meets the minimum filter)
    const matchesSalary = job.salaryMax >= filters.minSalary;

    // 4. Experience
    const matchesExperience = filters.experienceLevel === 'All' || job.experienceLevel === filters.experienceLevel;

    // 5. Job Type
    const matchesJobType = filters.jobType === 'All' || job.jobType === filters.jobType;

    // 6. Remote/Onsite
    const matchesRemote = filters.isRemote === null || job.isRemote === filters.isRemote;

    // 7. Publication Date (Simulated against Nov 10, 2026)
    let matchesDate = true;
    if (filters.datePosted !== 'All') {
      const pubDate = new Date(job.publishedDate).getTime();
      const referenceDate = new Date('2026-11-10').getTime(); // Reference date for this prototype
      const diffDays = (referenceDate - pubDate) / (1000 * 3600 * 24);

      if (filters.datePosted === 'Last 24 hours' && diffDays > 1) matchesDate = false;
      if (filters.datePosted === 'Last 7 days' && diffDays > 7) matchesDate = false;
      if (filters.datePosted === 'Last 30 days' && diffDays > 30) matchesDate = false;
    }

    return (
      matchesSearch &&
      matchesCategory &&
      matchesSalary &&
      matchesExperience &&
      matchesJobType &&
      matchesRemote &&
      matchesDate
    );
  });
}