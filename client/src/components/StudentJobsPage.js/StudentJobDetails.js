import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { IoLocation } from "react-icons/io5";
import { RiBuilding2Line } from "react-icons/ri";
import { FaMoneyBillWave } from "react-icons/fa6";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import Cookies from 'js-cookie';
import './StudentJobDetails.css';

const StudentJobDetails = ({ job }) => {
    const [logoUrl, setLogoUrl] = useState('');
    const [appliedJobs, setAppliedJobs] = useState(() => {
        const storedAppliedJobs = localStorage.getItem('appliedJobs');
        return storedAppliedJobs ? JSON.parse(storedAppliedJobs) : [];
    });

    const [savedJobs, setSavedJobs] = useState(() => {
        const storedSavedJobs = localStorage.getItem('savedJobs');
        return storedSavedJobs ? JSON.parse(storedSavedJobs) : [];
    });


    const [showModal, setShowModal] = useState(false);
    const [resume, setResume] = useState(null);

    const daysSincePosted = (postedAt) => {
        const posted = new Date(postedAt);
        const now = new Date();
        const diffTime = Math.abs(now - posted);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return formatDays(diffDays);
    };

    const formatDays = (days) => {
        const years = Math.floor(days / 365);
        const months = Math.floor((days % 365) / 30);
        const remainingDays = days % 30;

        let result = "";
        if (years > 0) {
            result += `${years} year${years > 1 ? 's' : ''} `;
        }
        if (months > 0) {
            result += `${months} month${months > 1 ? 's' : ''} `;
        }
        if (remainingDays > 0 || result === "") {
            result += `${remainingDays} day${remainingDays > 1 ? 's' : ''}`;
        }
        return result.trim();
    };

    const formatSalary = (salary) => {
        return `$${salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
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
        const filename = parts.slice(2).join('/');

        return {
            key: parts.slice(1).join('/'),
            recruiterUid,
            folderName,
            filename,
        };
    };

    useEffect(() => {
        const fetchLogoURL = async () => {
            try {
                const { key, recruiterUid, folderName, filename } = extractUrlParts(job.recruiterInfo?.logo);
                const response = await axios.get(`http://localhost:3001/api/recruiter/get-signed-url?filename=${filename}&folderName=${folderName}&recruiterUid=${recruiterUid}`);
                const { downloadUrl } = response.data;
                setLogoUrl(downloadUrl);
            } catch (error) {
                console.error('Error fetching image URL:', error);
            }
        };

        if (job && job.recruiterInfo?.logo) {
            fetchLogoURL();
        }
    }, [job]);

    const handleApplyClick = () => {
        setShowModal(true);
    };

    const handleResumeChange = (e) => {
        setResume(e.target.files[0]);
    };

    const submitApplication = async () => {
      const studentCookie = JSON.parse(Cookies.get('student'));

      const formData = new FormData();
      formData.append('filename', resume.name);
      formData.append('filetype', resume.type);
      formData.append('folderName', "Resume");
      formData.append('file', resume);
      formData.append('uid', studentCookie.uid);

      console.log(formData);
      const response = await fetch('http://localhost:3001/api/applicant/fileupload', {
          method: 'POST',
          body: formData,
      });

    const data = await response.json();
        const applicationInfo = {
            jobId: job.id,
            jobTitle: job?.jobTitle,
            jobType: job.jobType,
            jobDescription: job.jobDescription,
            salary: job.salary,
            recruiterInfo: job.recruiterInfo,
            studentInfo: studentCookie,
            resumeUrl: data.fileUrl, // Add resume to the application info
        };
        
        console.log("Resume uploaded : ",applicationInfo);
        try {
            const response = await fetch('http://localhost:3001/api/application', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(applicationInfo),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Successfully Applied:', data);
            setAppliedJobs((prevAppliedJobs) => {
                const updatedAppliedJobs = [...prevAppliedJobs, job.id];
                localStorage.setItem('appliedJobs', JSON.stringify(updatedAppliedJobs));
                return updatedAppliedJobs;
            });
            setShowModal(false); // Close the modal after application is submitted
        } catch (error) {
            console.log(error);
        }
    };

    const saveApplication = async () => {
        const studentCookie = JSON.parse(Cookies.get('student'));
        console.log()
        try {
            // const response = await fetch('http://localhost:3001/api/jobs/savedJobs?StudentID=${studentCookie.uid}', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(applicationInfo),
            // });

            const response = await axios.post(`http://localhost:3001/api/jobs/savedJobs?StudentID=${studentCookie.uid}&JobID=${job.id}`);
            const { downloadUrl } = response.data;


            setSavedJobs((prevSavedJobs) => {
                const updatedSavedJobs = [...prevSavedJobs, job.id];
                localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs));
                return updatedSavedJobs;
            });
            return downloadUrl;
            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }

            // const data = await response.json();
            // console.log('Successfully Applied:', data);
            // setAppliedJobs((prevAppliedJobs) => {
            //     const updatedAppliedJobs = [...prevAppliedJobs, job.id];
            //     localStorage.setItem('appliedJobs', JSON.stringify(updatedAppliedJobs));
            //     return updatedAppliedJobs;
            // });
            // setShowModal(false); // Close the modal after application is submitted
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="job-details-content">
            {job ? (
                <>
                    <div className='company-info'>
                        {logoUrl && <img src={logoUrl} alt="Company Logo" />}
                        <div>
                            <h2>{job.recruiterInfo?.company}</h2>
                            <p>{job.recruiterInfo?.industry}</p>
                        </div>
                    </div>
                    <h2>{job.jobTitle}</h2>
                    <p>Posted {daysSincePosted(job.posted_at)} ago</p>
                    <button 
                        id='saved-jobs-button'
                        className='saved-jobs-button'
                        onClick={saveApplication}
                        disabled={savedJobs.includes(job.id)}
                    >
                        {savedJobs.includes(job.id) ? "Saved" : "Save"} {savedJobs.includes(job.id) ? <FaBookmark /> : <FaRegBookmark />}
                        {/* Save < FaRegBookmark /> */}
                    </button>
                    <button
                        id='apply-button'
                        className='apply-button'
                        onClick={handleApplyClick}
                        disabled={appliedJobs.includes(job.id)}
                    >
                        {appliedJobs.includes(job.id) ? "Applied" : "Quick Apply"} {appliedJobs.includes(job.id) ? <FaCheck /> : <LuSend />}
                    </button>
                    <p><IoLocation size={30} /> {job.location}</p>
                    <p><RiBuilding2Line size={30} /> {job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)}</p>
                    <p><FaMoneyBillWave size={30} /> {formatSalary(job.salary)}</p>
                    <div className='job-description'>Job Description <hr></hr>{job.jobDescription}</div>
                    {job.skills && 
                    <div className='job-skills'>
                        Skills Required<hr></hr>
                        {job.skills.map((skill) => (
                            <ul>
                                <li>{skill}</li>
                            </ul>
                            ))}
                    </div>}
                </>
            ) : (
                <p>Select a job to see the details</p>
            )}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Apply for {job?.jobTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p> Attach your resume for review. We will review your skills and expereince and contact you if we feel that you are a good match for the job role</p>
                    <input className="form-control" type="file" onChange={handleResumeChange} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={submitApplication}>Submit Application</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default StudentJobDetails;
