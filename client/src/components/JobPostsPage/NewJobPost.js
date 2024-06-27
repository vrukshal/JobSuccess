import React, { useState, useEffect } from 'react';
import './NewJobPost.css';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jobTitles } from '../jobTitles';

const NewJobPost = () => {
  const recruiterCookie = JSON.parse(Cookies.get('recruiter'));
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobType: 'job',
    employmentType: 'full-time',
    duration: 'permanent',
    workStudy: 'no',
    location: '',
    jobDescription: '',
    salary: '',
    applyLink: '',
    recruiterUid: recruiterCookie.uid,
    recruiterInfo: recruiterCookie
  });

  const [countries, setCountries] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://countriesnow.space/api/v0.1/countries')
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          const countryList = data.data.map(country => country.country);
          setCountries(countryList);
        }
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'jobTitle') {
      const filteredSuggestions = jobTitles.filter(title => 
        title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData({ ...formData, jobTitle: suggestion });
    setSuggestions([]);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const createJobPost = () => {
    formData.posted_at = 
    fetch('http://localhost:3001/api/jobs/newjobpost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log('Job post created successfully');
          navigate('/rec/postings');
          // Redirect or reset form as needed
        } else {
          console.log('Error creating job post');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="container">
      {step === 1 && (
        <div className="form-section">
          <h2>Job Basics</h2>
          <form>
            <div className="form-group">
              <label>Job Title</label>
              <input 
                type="text" 
                name="jobTitle" 
                className="form-control" 
                value={formData.jobTitle} 
                onChange={handleChange} 
              />
              {suggestions.length > 0 && (
                <ul className="suggestions-list">
                  {suggestions.map((suggestion, index) => (
                    <li 
                      key={index} 
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="form-group">
              <label>Job Type</label>
              <div>
                <input type="radio" name="jobType" value="job" checked={formData.jobType === 'job'} onChange={handleChange} /> Job
                <input type="radio" name="jobType" value="internship" checked={formData.jobType === 'internship'} onChange={handleChange} /> Internship
                {/* Add more options here */}
              </div>
            </div>
            <div className="form-group">
              <label>Employment Type</label>
              <div>
                <input type="radio" name="employmentType" value="full-time" checked={formData.employmentType === 'full-time'} onChange={handleChange} /> Full-Time
                <input type="radio" name="employmentType" value="part-time" checked={formData.employmentType === 'part-time'} onChange={handleChange} /> Part-Time
              </div>
            </div>
            <div className="form-group">
              <label>Duration</label>
              <div>
                <input type="radio" name="duration" value="permanent" checked={formData.duration === 'permanent'} onChange={handleChange} /> Permanent
                <input type="radio" name="duration" value="temporary" checked={formData.duration === 'temporary'} onChange={handleChange} /> Temporary/Seasonal
              </div>
            </div>
            <div className="form-group">
              <label>Is this a work study job?</label>
              <div>
                <input type="radio" name="workStudy" value="yes" checked={formData.workStudy === 'yes'} onChange={handleChange} /> Yes
                <input type="radio" name="workStudy" value="no" checked={formData.workStudy === 'no'} onChange={handleChange} /> No
              </div>
            </div>
            <button type="button" onClick={nextStep}>Next</button>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="form-section">
          <h2>Job Details</h2>
          <form>
            <div className="form-group">
              <label>Job Description</label>
              <textarea className="form-control" name="jobDescription" value={formData.jobDescription} onChange={handleChange} rows="3"></textarea>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">$</span>
              <input type="text" className="form-control" name="salary" value={formData.salary} onChange={handleChange} aria-label="Amount (to the nearest dollar)" />
              <span className="input-group-text">.00</span>
            </div>
            <div className="form-group">
              <label>Location</label>
              <select name="location" className="form-control" value={formData.location} onChange={handleChange}>
                <option value="">Select a country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Link to Apply</label>
              <input type="link" className="form-control" name="applyLink" value={formData.applyLink} onChange={handleChange} />
            </div>
            {/* Add more fields here */}
            <button type="button" onClick={prevStep}>Back</button>
            <button type="button" onClick={createJobPost}>Create Job Post</button>
          </form>
        </div>
      )}
      
      {/* Add more steps here */}
    </div>
  );
};

export default NewJobPost;
