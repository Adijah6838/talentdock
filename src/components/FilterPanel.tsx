import type { FilterOptions } from '../utils/filtering';

interface FilterPanelProps {
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
  clearFilters: () => void;
}

export function FilterPanel({ filters, setFilters, clearFilters }: FilterPanelProps) {
  return (
    <div className="filter-panel">
      <div className="filter-group">
        <label>Category</label>
        <select value={filters.category} onChange={(e) => setFilters({...filters, category: e.target.value})}>
          <option value="All">All Categories</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
          <option value="Data">Data</option>
          <option value="Marketing">Marketing</option>
          <option value="Product">Product</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Min Salary ($/hr)</label>
        <input 
          type="number" 
          value={filters.minSalary || ''} 
          onChange={(e) => setFilters({...filters, minSalary: Number(e.target.value)})} 
          placeholder="0"
        />
      </div>

      <div className="filter-group">
        <label>Experience</label>
        <select value={filters.experienceLevel} onChange={(e) => setFilters({...filters, experienceLevel: e.target.value})}>
          <option value="All">All Levels</option>
          <option value="Entry Level">Entry Level</option>
          <option value="Mid Level">Mid Level</option>
          <option value="Senior Level">Senior Level</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Job Type</label>
        <select value={filters.jobType} onChange={(e) => setFilters({...filters, jobType: e.target.value})}>
          <option value="All">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Freelance">Freelance</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Location</label>
        <select 
          value={filters.isRemote === null ? 'All' : filters.isRemote ? 'Remote' : 'Onsite'} 
          onChange={(e) => {
            const val = e.target.value;
            setFilters({...filters, isRemote: val === 'All' ? null : val === 'Remote'});
          }}
        >
          <option value="All">All Locations</option>
          <option value="Remote">Remote Only</option>
          <option value="Onsite">Onsite Only</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Date Posted</label>
        <select value={filters.datePosted} onChange={(e) => setFilters({...filters, datePosted: e.target.value})}>
          <option value="All">Any Time</option>
          <option value="Last 24 hours">Last 24 Hours</option>
          <option value="Last 7 days">Last 7 Days</option>
          <option value="Last 30 days">Last 30 Days</option>
        </select>
      </div>

      <button className="btn-secondary mt-2" onClick={clearFilters}>Clear Filters</button>
    </div>
  );
}