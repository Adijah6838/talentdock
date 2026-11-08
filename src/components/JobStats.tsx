import { Briefcase, Users, Building } from 'lucide-react';

export function JobStats({ totalJobs }: { totalJobs: number }) {
  return (
    <div className="job-stats">
      <div className="stat-card">
        <Briefcase size={24} className="stat-icon" />
        <div>
          <h4>{totalJobs}</h4>
          <p>Open Jobs</p>
        </div>
      </div>
      <div className="stat-card">
        <Building size={24} className="stat-icon" />
        <div>
          <h4>50+</h4>
          <p>Companies</p>
        </div>
      </div>
      <div className="stat-card">
        <Users size={24} className="stat-icon" />
        <div>
          <h4>1.2k</h4>
          <p>Hired</p>
        </div>
      </div>
    </div>
  );
}