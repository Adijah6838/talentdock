import { useJobs } from '../hooks/useJobs';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { JobCard } from '../components/JobCard';
import { JobStats } from '../components/JobStats';
import { EmptyState } from '../components/EmptyState';

export function Dashboard() {
  const { jobs, allJobs, filters, setFilters, clearFilters } = useJobs();
  const [savedJobIds, setSavedJobIds] = useLocalStorage<string[]>('savedJobs', []);

  const toggleSave = (id: string) => {
    setSavedJobIds((prev) =>
      prev.includes(id) ? prev.filter((jobId) => jobId !== id) : [...prev, id]
    );
  };

  // The latest 6 jobs for the "Latest Jobs" section
  const latestJobs = [...allJobs].sort((a, b) => 
    new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  ).slice(0, 6);

  return (
    <div className="dashboard-container">
      <section className="hero-section">
        <h1>Find Your Next Tech Role</h1>
        <p>Discover thousands of job opportunities with all the information you need.</p>
        <SearchBar value={filters.search} onChange={(val) => setFilters({ ...filters, search: val })} />
      </section>

      <JobStats totalJobs={allJobs.length} />

      <div className="dashboard-layout">
        <aside className="sidebar">
          <FilterPanel filters={filters} setFilters={setFilters} clearFilters={clearFilters} />
        </aside>

        <main className="main-content">
          {filters.search === '' && filters.category === 'All' && (
            <section className="featured-section">
              <h2>Featured Jobs</h2>
              <div className="jobs-grid">
                {allJobs.slice(0, 3).map((job) => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    isSaved={savedJobIds.includes(job.id)} 
                    onToggleSave={toggleSave} 
                  />
                ))}
              </div>
            </section>
          )}

          <section className="latest-section">
            <h2>{filters.search || filters.category !== 'All' ? 'Search Results' : 'Latest Jobs'}</h2>
            {jobs.length === 0 ? (
              <EmptyState title="No jobs found" message="Try adjusting your filters or search terms to find what you're looking for." />
            ) : (
              <div className="jobs-grid">
                {jobs.map((job) => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    isSaved={savedJobIds.includes(job.id)} 
                    onToggleSave={toggleSave} 
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}