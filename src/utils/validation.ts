export interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  title: string;
  experience: string;
  skills: string;
  portfolio: string;
  coverLetter: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

export function validateApplication(data: ApplicationFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.fullName.trim()) errors.fullName = 'Full name is required.';
  
  if (!data.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email format.';
  }

  if (!data.phone.trim()) errors.phone = 'Phone number is required.';
  if (!data.title.trim()) errors.title = 'Professional title is required.';
  if (!data.experience.trim()) errors.experience = 'Years of experience is required.';
  if (!data.skills.trim()) errors.skills = 'Technical skills are required.';

  if (data.portfolio.trim()) {
    try {
      new URL(data.portfolio);
    } catch {
      errors.portfolio = 'Please enter a valid URL (including http:// or https://).';
    }
  }

  if (!data.coverLetter.trim()) {
    errors.coverLetter = 'Cover letter is required.';
  } else if (data.coverLetter.trim().length < 100) {
    errors.coverLetter = `Cover letter must be at least 100 characters (currently ${data.coverLetter.trim().length}).`;
  }

  return errors;
}