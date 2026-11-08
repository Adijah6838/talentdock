import { Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Bookmark } from 'lucide-react';
import type { Job } from '../types/job';

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export function JobCard({ job, isSaved, onToggleSave }: JobCardProps) {
  return (
    <div className="job-card">
      <div className="job-card-header">
        <div>
          <h3 className="job-title">{job.title}</h3>
          <p className="job-company">{job.company}</p>
        </div>
        <button
          className={`save-btn ${isSaved ? 'saved' : ''}`}
          onClick={() => onToggleSave(job.id)}
          aria-label="Save job"
        >
          <Bookmark size={20} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      <div className="job-tags">
        {job.skills.map((skill) => (
          <span key={skill} className="tag">{skill}</span>
        ))}
      </div>

      <div className="job-meta">
        <span><MapPin size={16} /> {job.location}</span>
        <span><Clock size={16} /> {job.jobType}</span>
        <span><DollarSign size={16} /> ${job.salaryMin} - ${job.salaryMax}/hr</span>
      </div>

      <div className="job-card-footer">
        <span className="job-date">Posted: {job.publishedDate}</span>
        <Link to={`/job/${job.id}`} className="btn-primary">View Details</Link>
      </div>
    </div>
  );
}