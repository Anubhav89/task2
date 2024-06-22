import React from 'react';

const FormDetail = ({ data }) => (
  <div className="form-summary">
    <h2>Application Summary</h2>
    <p>Full Name: {data.fullName}</p>
    <p>Email: {data.email}</p>
    <p>Phone Number: {data.phoneNumber}</p>
    <p>Position: {data.position}</p>
    {(data.position === 'Developer' || data.position === 'Designer') && (
      <p>Relevant Experience: {data.relevantExperience} years</p>
    )}
    {data.position === 'Designer' && <p>Portfolio URL: {data.portfolioUrl}</p>}
    {data.position === 'Manager' && <p>Management Experience: {data.managementExperience}</p>}
    <p>Additional Skills: {data.additionalSkills.join(', ')}</p>
    <p>Preferred Interview Time: {new Date(data.preferredInterviewTime).toLocaleString()}</p>
  </div>
);

export default FormDetail;