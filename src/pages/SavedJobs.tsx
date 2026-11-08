import { useLocalStorage } from '../hooks/useLocalStorage';
import { jobs as allJobs } from '../data/jobs';
import { JobCard } from '../components/JobCard';
import { EmptyState } from '../components/EmptyState';
import { Link } from 'react-router-dom';

export function SavedJobs() {
  const [savedJobIds, setSavedJobIds] = useLocalStorage<string[]>('savedJobs', []);
  
  const savedJobs = allJobs.filter(job => savedJobIds.includes(job.id));

  const toggleSave = (id: string) => {
    setSavedJobIds((prev) => prev.filter((jobId) => jobId !== id));
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Saved Jobs</h1>
        <p>You have {savedJobs.length} saved job{savedJobs.length !== 1 ? 's' : ''}.</p>
      </div>
      
      {savedJobs.length === 0 ? (
        <div>
          <EmptyState title="No saved jobs yet" message="Browse the dashboard and click the bookmark icon to save jobs for later." />
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link to="/" className="btn-primary">Browse Jobs</Link>
          </div>
        </div>
      ) : (
        <div className="jobs-grid">
          {savedJobs.map(job => (
            <JobCard key={job.id} job={job} isSaved={true} onToggleSave={toggleSave} />
          ))}
        </div>
      )}
    </div>
  );
}