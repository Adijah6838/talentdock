import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Application } from '../types/application';
import { jobs } from '../data/jobs';
import { EmptyState } from '../components/EmptyState';
import { Link } from 'react-router-dom';

export function Applications() {
  const [applications] = useLocalStorage<Application[]>('applications', []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Application History</h1>
        <p>Track the status of your job applications.</p>
      </div>

      {applications.length === 0 ? (
        <div>
          <EmptyState title="No applications yet" message="Apply for a job to see its status here." />
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link to="/" className="btn-primary">Find Jobs</Link>
          </div>
        </div>
      ) : (
        <div className="applications-list">
          {applications.map(app => {
            const job = jobs.find(j => j.id === app.jobId);
            return (
              <div key={app.id} className="application-card">
                <div className="app-info">
                  <h3>{job?.title || 'Unknown Job'}</h3>
                  <p>{job?.company || 'Unknown Company'}</p>
                  <span className="app-date">Applied: {app.appliedDate}</span>
                </div>
                <div className="app-status">
                  <span className={`status-badge status-${app.status.replace(/\s+/g, '-').toLowerCase()}`}>
                    {app.status}
                  </span>
                  {job && <span className="app-salary">${job.salaryMin} - ${job.salaryMax}/hr</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}