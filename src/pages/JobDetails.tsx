import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { jobs } from '../data/jobs';
import { ApplicationForm } from '../components/ApplicationForm';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Application } from '../types/application';
import { ArrowLeft, MapPin, DollarSign, Clock, Calendar, CheckCircle } from 'lucide-react';

export function JobDetails() {
  const { id } = useParams();
  const job = jobs.find(j => j.id === id);
  const [applications] = useLocalStorage<Application[]>('applications', []);
  const [success, setSuccess] = useState(false);

  if (!job) {
    return (
      <div className="page-container">
        <h2>Job not found</h2>
        <Link to="/" className="btn-primary mt-2">Back to Dashboard</Link>
      </div>
    );
  }

  const hasApplied = applications.some(app => app.jobId === job.id);

  return (
    <div className="page-container job-details-page">
      <Link to="/" className="back-link"><ArrowLeft size={16} /> Back to jobs</Link>
      
      {success && (
        <div className="success-banner">
          <CheckCircle size={20} /> Application submitted successfully!
        </div>
      )}

      <div className="job-details-layout">
        <div className="job-main-info">
          <div className="job-header">
            <h1>{job.title}</h1>
            <p className="company-name">{job.company}</p>
            <div className="job-meta">
              <span><MapPin size={16} /> {job.location} {job.isRemote && '(Remote)'}</span>
              <span><Clock size={16} /> {job.jobType}</span>
              <span><DollarSign size={16} /> ${job.salaryMin} - ${job.salaryMax}/hr</span>
              <span><Calendar size={16} /> Apply by: {job.deadline}</span>
            </div>
          </div>

          <div className="job-section">
            <h2>Job Description</h2>
            <p>{job.description}</p>
          </div>

          <div className="job-section">
            <h2>Responsibilities</h2>
            <ul>
              {job.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
            </ul>
          </div>

          <div className="job-section">
            <h2>Qualifications</h2>
            <ul>
              {job.qualifications.map((qual, i) => <li key={i}>{qual}</li>)}
            </ul>
          </div>

          <div className="job-section">
            <h2>Required Skills</h2>
            <div className="job-tags">
              {job.skills.map(skill => <span key={skill} className="tag">{skill}</span>)}
            </div>
          </div>
        </div>

        <aside className="job-sidebar">
          <ApplicationForm 
            jobId={job.id} 
            hasApplied={hasApplied} 
            onSuccess={() => setSuccess(true)} 
          />
        </aside>
      </div>
    </div>
  );
}