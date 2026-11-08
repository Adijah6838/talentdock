import { describe, it, expect } from 'vitest';
import { validateApplication, ApplicationFormData } from '../utils/validation';

const validData: ApplicationFormData = {
  fullName: 'John Doe', email: 'john@example.com', phone: '1234567890', title: 'Developer',
  experience: '5', skills: 'React, TS', portfolio: 'https://johndoe.com',
  coverLetter: 'This is a very long cover letter that is definitely over one hundred characters long to pass the validation test easily.'
};

describe('validateApplication', () => {
  it('returns no errors for valid data', () => {
    expect(validateApplication(validData)).toEqual({});
  });

  it('returns error for invalid email', () => {
    const errors = validateApplication({ ...validData, email: 'invalid-email' });
    expect(errors.email).toBeDefined();
  });

  it('returns error for short cover letter', () => {
    const errors = validateApplication({ ...validData, coverLetter: 'Too short' });
    expect(errors.coverLetter).toBeDefined();
  });
});