import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JobApplicantsPage.css'; // Create this CSS file for styling
import { useParams } from 'react-router-dom';
import RecruiterNavbar from '../RecruiterNavbar';
import RecruiterSidebar from '../RecruiterSidebar';
import { FaLinkedin } from "react-icons/fa6";
import { BsFileEarmarkPdfFill } from "react-icons/bs";

const JobApplicantsPage = () => {
  const [applicants, setApplicants] = useState([]);
  const { jobId } = useParams();

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/application?jobId=${jobId}`); // Replace with your API endpoint
        console.log("Applicant data:", response.data.data);
        setApplicants(response.data.data);
      } catch (error) {
        console.error('Error fetching applicants:', error);
      }
    };

    fetchApplicants();
  }, [jobId]);

  const handleStatusChange = (id, newStatus) => {
    setApplicants(prevApplicants =>
      prevApplicants.map(applicant =>
        applicant.id === id ? { ...applicant, status: newStatus } : applicant
      )
    );
    // Optionally, update the status in the backend
    // TODO: Make API call to update status in the backend
    // axios.patch(`http://localhost:3001/api/applicants/${id}`, { status: newStatus })
    //   .catch(error => console.error('Error updating status:', error));
  };

  const extractUrlParts = (url) => {
    const urlObject = new URL(url);
    const pathname = urlObject.pathname;
    const parts = pathname.split('/').filter(Boolean);

    if (parts.length < 3) {
      throw new Error('Invalid URL format');
    }

    const recruiterUid = parts[0];
    const folderName = parts[1];
    const filename = parts.slice(2).join('/'); // In case there are subfolders

    return {
      key: parts.slice(1).join('/'), // Exclude the recruiterUid from the key
      recruiterUid,
      folderName,
      filename,
    };
  };

  const openResume = async (applicant) => {
    try {
      const { key, recruiterUid, folderName, filename } = extractUrlParts(applicant?.resumeUrl);
      const response = await axios.get(`http://localhost:3001/api/recruiter/get-signed-url?filename=${filename}&folderName=${folderName}&recruiterUid=${recruiterUid}`);
      console.log(response);
      const { downloadUrl } = response.data;

      window.open(downloadUrl, '_blank'); // Open the file in a new tab
    } catch (error) {
      console.error('Error fetching view URL:', error);
    }
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
              <th>LinkedIn</th>
              <th>Date</th>
              <th>Resume</th>
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
                <td><a href={applicant.studentInfo.linkedInUrl}><FaLinkedin size={30} /></a></td>
                <td>{new Date(applicant.studentInfo.date).toLocaleDateString()}</td>
                <td onClick={() => openResume(applicant)} style={{ cursor: 'pointer' }}><BsFileEarmarkPdfFill /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default JobApplicantsPage;
