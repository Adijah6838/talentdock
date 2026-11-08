import { useState } from 'react';
import { validateApplication } from '../utils/validation';
import type { ApplicationFormData, ValidationErrors } from '../utils/validation';
import type { Application } from '../types/application';

interface Props {
  jobId: string;
  onSuccess: () => void;
  hasApplied: boolean;
}

export function ApplicationForm({ jobId, onSuccess, hasApplied }: Props) {
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '', email: '', phone: '', title: '', experience: '', skills: '', portfolio: '', coverLetter: ''
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateApplication(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newApplication: Application = {
      ...formData,
      id: `app_${Date.now()}`,
      jobId,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Submitted'
    };

    const existingApps = JSON.parse(localStorage.getItem('applications') || '[]');
    localStorage.setItem('applications', JSON.stringify([...existingApps, newApplication]));

    setErrors({});
    onSuccess();
  };

  if (hasApplied) {
    return (
      <div className="applied-message">
        <h3>Application Submitted</h3>
        <p>You have already applied for this position.</p>
      </div>
    );
  }

  return (
    <form className="application-form" onSubmit={handleSubmit}>
      <h2>Apply for this Job</h2>
      
      <div className="form-group">
        <label>Full Name *</label>
        <input type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
        {errors.fullName && <span className="error-text">{errors.fullName}</span>}
      </div>

      <div className="form-group">
        <label>Email Address *</label>
        <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label>Phone Number *</label>
        <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
        {errors.phone && <span className="error-text">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label>Professional Title *</label>
        <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
        {errors.title && <span className="error-text">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label>Years of Experience *</label>
        <input type="number" value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} />
        {errors.experience && <span className="error-text">{errors.experience}</span>}
      </div>

      <div className="form-group">
        <label>Technical Skills *</label>
        <input type="text" placeholder="e.g., React, Node.js, TypeScript" value={formData.skills} onChange={(e) => setFormData({...formData, skills: e.target.value})} />
        {errors.skills && <span className="error-text">{errors.skills}</span>}
      </div>

      <div className="form-group">
        <label>Portfolio URL</label>
        <input type="url" placeholder="https://..." value={formData.portfolio} onChange={(e) => setFormData({...formData, portfolio: e.target.value})} />
        {errors.portfolio && <span className="error-text">{errors.portfolio}</span>}
      </div>

      <div className="form-group">
        <label>Cover Letter * (Min 100 characters)</label>
        <textarea rows={5} value={formData.coverLetter} onChange={(e) => setFormData({...formData, coverLetter: e.target.value})} />
        {errors.coverLetter && <span className="error-text">{errors.coverLetter}</span>}
      </div>

      <button type="submit" className="btn-primary w-full">Submit Application</button>
    </form>
  );
}