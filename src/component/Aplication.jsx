import React from 'react';
import useForm from '../hooks/useForm';
import FormDetail from './FormDetail';

const initialState = {
  fullName: '',
  email: '',
  phoneNumber: '',
  position: '',
  relevantExperience: '',
  portfolioUrl: '',
  managementExperience: '',
  additionalSkills: [],
  preferredInterviewTime: '',
};

const validate = (values) => {
  const errors = {};
  if (!values.fullName) errors.fullName = 'Full Name is required';
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email is invalid';
  }
  if (!values.phoneNumber) errors.phoneNumber = 'Phone Number is required';
  if (!values.position) errors.position = 'Position is required';
  if ((values.position === 'Developer' || values.position === 'Designer') && !values.relevantExperience) {
    errors.relevantExperience = 'Relevant Experience is required';
  }
  if (values.position === 'Designer' && !values.portfolioUrl) {
    errors.portfolioUrl = 'Portfolio URL is required';
  }
  if (values.position === 'Manager' && !values.managementExperience) {
    errors.managementExperience = 'Management Experience is required';
  }
  if (values.additionalSkills.length === 0) {
    errors.additionalSkills = 'At least one skill must be selected';
  }
  if (!values.preferredInterviewTime) {
    errors.preferredInterviewTime = 'Preferred Interview Time is required';
  }
  return errors;
};

const ApplicationForm = () => {
  const { 
    values, 
    errors, 
    isSubmitting, 
    handleChange, 
    handleMultipleCheckboxes, 
    handleSubmit 
  } = useForm(initialState, validate);

  return (
    <div className="form-container">
      <h1>Job Application Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <span className="error">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="position">Applying for Position:</label>
          <select
            id="position"
            name="position"
            value={values.position}
            onChange={handleChange}
          >
            <option value="">Select a position</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
          {errors.position && <span className="error">{errors.position}</span>}
        </div>

        {(values.position === 'Developer' || values.position === 'Designer') && (
          <div className="form-group">
            <label htmlFor="relevantExperience">Relevant Experience (years):</label>
            <input
              type="number"
              id="relevantExperience"
              name="relevantExperience"
              value={values.relevantExperience}
              onChange={handleChange}
            />
            {errors.relevantExperience && <span className="error">{errors.relevantExperience}</span>}
          </div>
        )}

        {values.position === 'Designer' && (
          <div className="form-group">
            <label htmlFor="portfolioUrl">Portfolio URL:</label>
            <input
              type="url"
              id="portfolioUrl"
              name="portfolioUrl"
              value={values.portfolioUrl}
              onChange={handleChange}
            />
            {errors.portfolioUrl && <span className="error">{errors.portfolioUrl}</span>}
          </div>
        )}

        {values.position === 'Manager' && (
          <div className="form-group">
            <label htmlFor="managementExperience">Management Experience:</label>
            <textarea
              id="managementExperience"
              name="managementExperience"
              value={values.managementExperience}
              onChange={handleChange}
            />
            {errors.managementExperience && <span className="error">{errors.managementExperience}</span>}
          </div>
        )}

        <div className="form-group">
          <label>Additional Skills:</label>
          {['JavaScript', 'CSS', 'Python', 'Java', 'React'].map(skill => (
            <label key={skill} className="checkbox-label">
              <input
                type="checkbox"
                name="additionalSkills"
                value={skill}
                checked={values.additionalSkills.includes(skill)}
                onChange={(e) => handleMultipleCheckboxes('additionalSkills', skill, e.target.checked)}
              />
              {skill}
            </label>
          ))}
          {errors.additionalSkills && <span className="error">{errors.additionalSkills}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="preferredInterviewTime">Preferred Interview Time:</label>
          <input
            type="datetime-local"
            id="preferredInterviewTime"
            name="preferredInterviewTime"
            value={values.preferredInterviewTime}
            onChange={handleChange}
          />
          {errors.preferredInterviewTime && <span className="error">{errors.preferredInterviewTime}</span>}
        </div>

        <button type="submit">Submit Application</button>
      </form>
      {isSubmitting && <FormDetail data={values} />}
    </div>
  );
};

export default ApplicationForm;