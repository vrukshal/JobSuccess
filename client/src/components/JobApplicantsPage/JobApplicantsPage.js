import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JobApplicantsPage.css'; // Create this CSS file for styling
import { useParams } from 'react-router-dom';
import RecruiterNavbar from '../RecruiterNavbar';
import RecruiterSidebar from '../RecruiterSidebar';
import { FaLinkedin } from "react-icons/fa6";

const JobApplicantsPage = () => {
  const [applicants, setApplicants] = useState([]);
  const { jobId } = useParams();

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/application?jobId=${jobId}`); // Replace with your API endpoint
        console.log("APplicant data:",response.data.data);
        setApplicants(response.data.data);
      } catch (error) {
        console.error('Error fetching applicants:', error);
      }
    };

    fetchApplicants();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setApplicants(prevApplicants =>
      prevApplicants.map(applicant =>
        applicant.id === id ? { ...applicant, status: newStatus } : applicant
      )
    );
    // Optionally, update the status in the backend
    //TODO Make API like this:
    // axios.patch(`http://localhost:3001/api/applicants/${id}`, { status: newStatus })
    //   .catch(error => console.error('Error updating status:', error));
  };

  return (
    <>
    <RecruiterNavbar />
    <RecruiterSidebar />
    
    <div className="applicants-container">

      <h1>Applicants ({applicants.length})</h1>
      <div className="filter-options">
        <label>
          <input type="checkbox" /> Graduation Date / School Years
        </label>
        <label>
          <input type="checkbox" /> GPA
        </label>
        <label>
          <input type="checkbox" /> Majors
        </label>
        <label>
          <input type="checkbox" /> Work Authorization
        </label>
        <a href="#" className="select-all">Select All</a>
      </div>
      <button className="btn-download">Download all</button>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Linkedin</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((applicant) => (
            <tr key={applicant.id}>
              <td>{applicant.studentInfo.firstName} {applicant.studentInfo.lastName}</td>
              <td>{applicant.studentInfo.email}</td>
              <td>
                <select
                  value={applicant.status}
                  onChange={(e) => handleStatusChange(applicant.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Declined">Declined</option>
                  <option value="Hired">Hired</option>
                </select>
              </td>
              <td><a href={applicant.studentInfo.linkedInUrl}><FaLinkedin size={30}/></a></td>
              <td>{new Date(applicant.studentInfo.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default JobApplicantsPage;
