import React, { useEffect, useState } from 'react';
import './StudentProfilePage.css';
import Sidebar from '../Sidebar';
import Cookies from 'js-cookie';
import axios from 'axios';
import { FaPencilAlt } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import { MdSchool } from "react-icons/md";
import { MdWork } from "react-icons/md";

function StudentProfilePage() {
  const studentCookie = JSON.parse(Cookies.get('student'));
  const [imageUrl, setImageUrl] = useState('');
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  const [newEntry, setNewEntry] = useState({
    employerName: '',
    jobTitle: '',
    startDate: { month: '', year: '' },
    endDate: { month: '', year: '' },
    location: '',
    description: '',
    current: false
  });

  const extractUrlParts = (url) => {
    const urlObject = new URL(url);
    const pathname = urlObject.pathname;
    const parts = pathname.split('/').filter(Boolean);

    if (parts.length < 3) {
      throw new Error('Invalid URL format');
    }

    const studentUid = parts[0];
    const folderName = parts[1];
    const filename = parts.slice(2).join('/'); // In case there are subfolders

    return {
      key: parts.slice(1).join('/'), // Exclude the recruiterUid from the key
      studentUid,
      folderName,
      filename,
    };
  };

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const { key, studentUid, folderName, filename } = extractUrlParts(studentCookie.photoUrl);
        const response = await axios.get(`http://${process.env.REACT_APP_API_URL}:3001/api/applicant/get-signed-url?filename=${filename}&folderName=${folderName}&studentUid=${studentUid}`);
        const { downloadUrl } = response.data;
        setImageUrl(downloadUrl);
      } catch (error) {
        console.error('Error fetching image URL:', error);
      }
    };

    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://${process.env.REACT_APP_API_URL}:3001/api/applicant/${studentCookie.uid}`);
        setExperiences(response.data.data.experiences || []);
        setEducations(response.data.data.educations || []);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchImageUrl();
    fetchProfileData();
  }, []);

  const openModal = (section) => {
    setCurrentSection(section);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setNewEntry({
      employerName: '',
      jobTitle: '',
      startDate: { month: '', year: '' },
      endDate: { month: '', year: '' },
      location: '',
      description: '',
      current: false
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const [field, type] = name.split('.');

    setNewEntry((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [type]: value
      }
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNewEntry((prev) => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://${process.env.REACT_APP_API_URL}:3001/api/applicant/${studentCookie.uid}`, {
        section: currentSection,
        data: newEntry
      });

      if (currentSection === 'experiences') {
        setExperiences((prev) => [...prev, newEntry]);
      } else if (currentSection === 'educations') {
        setEducations((prev) => [...prev, newEntry]);
      }

      closeModal();
    } catch (error) {
      console.error('Error saving entry:', error);
    }
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from(new Array(50), (val, index) => new Date().getFullYear() - index);


  return (
    <>
    <div classname="profile-page-container">
      <Sidebar />
      <div className="student-profile-container">
        <div className="header">
          {imageUrl && <img className="profile-picture" src={imageUrl} alt="Profile" />}
        </div>
        <div className="profile-info">
          <h1>{studentCookie.firstName} {studentCookie.lastName} <span className="pronouns">(He/Him)</span></h1>
          <p>{studentCookie.currentRole} @ {studentCookie.currentCompany}</p>
          <p className="location">{studentCookie.location} • <a href={studentCookie.linkedInUrl}>{studentCookie.linkedInUrl}</a></p>
          <p className="connections">500+ connections</p>
          <div className="work-experience">
            <h2>Work Experience <FaPencilAlt onClick={() => openModal('experiences')} /></h2>
            {experiences.map((experience, index) => (
              <div key={index} className="experience-item">
                <MdWork size={31}/>
                <div className='experience-details'>
                    <p><strong>{experience.jobTitle}</strong></p>
                    <p>{experience.employerName}</p>
                    <p>{experience.startDate.month} {experience.startDate.year} - {experience.current ? 'Present' : `${experience.endDate.month} ${experience.endDate.year}`}</p>
                    <p>{experience.location}</p>
                    <p>{experience.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="education">
            <h2>Education <FaPencilAlt size={20} onClick={() => openModal('educations')} /></h2>
            {educations.map((education, index) => (
              <div key={index} className="education-item">
                < MdSchool size={31} />
                <div className='school-details'>
                    <p><strong>{education.school}</strong></p>
                    <p>{education.degree}</p>
                    <p>{education.startDate.month} {education.startDate.year} - {education.endDate.month} {education.endDate.year}</p>
                    <p>{education.location}</p>
                    <p>{education.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
      <Modal
        show={modalIsOpen}
        onHide={closeModal}
        contentLabel={`Add ${currentSection === 'experiences' ? 'Experience' : 'Education'}`}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add {currentSection === 'experiences' ? 'Experience' : 'Education'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-control" onSubmit={handleSubmit}>
            {currentSection === 'experiences' ? (
              <div id='experience-div' className='experience-div'>
                <label>Employer name</label>
                <input type="text" name="employerName" value={newEntry.employerName} onChange={handleInputChange} required />

                <label>Job title</label>
                <input type="text" name="jobTitle" value={newEntry.jobTitle} onChange={handleInputChange} required />

                <label>
                  <input type="checkbox" name="current" checked={newEntry.current} onChange={handleCheckboxChange} />
                  Currently working here
                </label>

                <label>Start date</label>
                <div>
                  <select name="startDate.month" value={newEntry.startDate.month} onChange={handleDateChange} required>
                    <option value="">Month</option>
                    {months.map((month, index) => (
                      <option key={index} value={month}>{month}</option>
                    ))}
                  </select>
                  <select name="startDate.year" value={newEntry.startDate.year} onChange={handleDateChange} required>
                    <option value="">Year</option>
                    {years.map((year, index) => (
                      <option key={index} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                {!newEntry.current && (
                  <>
                    <label>End date</label>
                    <div>
                      <select name="endDate.month" value={newEntry.endDate.month} onChange={handleDateChange}>
                        <option value="">Month</option>
                        {months.map((month, index) => (
                      <option key={index} value={month}>{month}</option>
                    ))}
                      </select>
                      <select name="endDate.year" value={newEntry.endDate.year} onChange={handleDateChange}>
                        <option value="">Year</option>
                        {years.map((year, index) => (
                      <option key={index} value={year}>{year}</option>
                    ))}
                      </select>
                    </div>
                  </>
                )}

                <label>Location</label>
                <input type="text" name="location" value={newEntry.location} onChange={handleInputChange} required />

                <label>Description</label>
                <textarea name="description" value={newEntry.description} onChange={handleInputChange} required></textarea>
              </div>
            ) : (
              <>
                <label>School name</label>
                <input type="text" name="school" value={newEntry.school} onChange={handleInputChange} required />

                <label>Degree</label>
                <input type="text" name="degree" value={newEntry.degree} onChange={handleInputChange} required />

                <label>Start date</label>
                <div>
                  <select name="startDate.month" value={newEntry.startDate.month} onChange={handleDateChange} required>
                    <option value="">Month</option>
                    {months.map((month, index) => (
                      <option key={index} value={month}>{month}</option>
                    ))}
                  </select>
                  <select name="startDate.year" value={newEntry.startDate.year} onChange={handleDateChange} required>
                    <option value="">Year</option>
                    {years.map((year, index) => (
                      <option key={index} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <label>End date</label>
                <div>
                  <select name="endDate.month" value={newEntry.endDate.month} onChange={handleDateChange}>
                    <option value="">Month</option>
                    {months.map((month, index) => (
                      <option key={index} value={month}>{month}</option>
                    ))}
                  </select>
                  <select name="endDate.year" value={newEntry.endDate.year} onChange={handleDateChange}>
                    <option value="">Year</option>
                    {years.map((year, index) => (
                      <option key={index} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <label>Location</label>
                <input type="text" name="location" value={newEntry.location} onChange={handleInputChange} required />

                <label>Description</label>
                <textarea name="description" value={newEntry.description} onChange={handleInputChange} required></textarea>
              </>
            )}

            <button type="submit">Save and close</button>
            <button type="button" onClick={closeModal}>Cancel</button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default StudentProfilePage;
