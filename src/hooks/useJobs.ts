import { useState, useMemo } from 'react';
import { jobs as allJobs } from '../data/jobs';
import { filterJobs } from '../utils/filtering';
import type { FilterOptions } from '../utils/filtering';

const initialFilters: FilterOptions = {
  search: '',
  category: 'All',
  minSalary: 0,
  experienceLevel: 'All',
  jobType: 'All',
  isRemote: null,
  datePosted: 'All',
};

export function useJobs() {
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);

  const filteredJobs = useMemo(() => {
    return filterJobs(allJobs, filters);
  }, [filters]);

  const clearFilters = () => setFilters(initialFilters);

  return {
    jobs: filteredJobs,
    allJobs,
    filters,
    setFilters,
    clearFilters,
  };
}