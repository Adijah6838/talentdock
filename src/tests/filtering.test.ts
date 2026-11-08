import { describe, it, expect } from 'vitest';
import { filterJobs, FilterOptions } from '../utils/filtering';
import { jobs } from '../data/jobs';

const defaultFilters: FilterOptions = {
  search: '', category: 'All', minSalary: 0, experienceLevel: 'All', jobType: 'All', isRemote: null, datePosted: 'All'
};

describe('filterJobs', () => {
  it('returns all jobs when filters are default', () => {
    expect(filterJobs(jobs, defaultFilters)).toHaveLength(jobs.length);
  });

  it('filters by search term (title)', () => {
    const result = filterJobs(jobs, { ...defaultFilters, search: 'frontend' });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every(j => j.title.toLowerCase().includes('frontend'))).toBe(true);
  });

  it('filters by category', () => {
    const result = filterJobs(jobs, { ...defaultFilters, category: 'Engineering' });
    expect(result.every(j => j.category === 'Engineering')).toBe(true);
  });
});