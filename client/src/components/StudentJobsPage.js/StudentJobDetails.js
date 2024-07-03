import React, { useEffect, useState } from 'react';
import './StudentJobDetails.css';
import axios from 'axios';
import { IoLocation } from "react-icons/io5";
import { RiBuilding2Line } from "react-icons/ri";
import { FaMoneyBillWave } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import Cookies from 'js-cookie';
const StudentJobDetails = ({ job }) => 
    
    {
        const [logoUrl, setLogoUrl] = useState('');
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
          if (remainingDays > 0 || result === "") { // Add days if no other unit is added
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
            const filename = parts.slice(2).join('/'); // In case there are subfolders
          
            return {
                key: parts.slice(1).join('/'), // Exclude the recruiterUid from the key
                recruiterUid,
                folderName,
                filename,
            };
          };

        useEffect(() => {
            const fetchLogoURL = async () => {
            try {
                console.log(job)
                const { key, recruiterUid, folderName, filename } = extractUrlParts(job.recruiterInfo?.logo);
                const response = await axios.get(`http://localhost:3001/api/recruiter/get-signed-url?filename=${filename}&folderName=${folderName}&recruiterUid=${recruiterUid}`);
                const { downloadUrl } = response.data;
                setLogoUrl(downloadUrl);
            } catch (error) {
                console.error('Error fetching image URL:', error);
            }
            };
            console.log(job);
            if (job && job.recruiterInfo?.logo) {
            fetchLogoURL();
            }
        }, [job]);

        const submitApplication = async () => {
            const studentCookie = JSON.parse(Cookies.get('student'));
            const applicationInfo = {
                jobId: job.id,
                recruiterInfo: job.recruiterInfo,
                studentInfo: studentCookie
              };
          
              console.log(applicationInfo);
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
                document.getElementById('apply-button').textContent = "Applied"
            }
            catch(error){
                console.log(error);
            }
        }

        return (
            <div className="job-details-content">
                {job ? (
                <>
                    <div className='company-info'>
                    {logoUrl && <img src={logoUrl} />}
                        <div>
                            <h2>{job.recruiterInfo?.company}</h2>
                            <p>{job.recruiterInfo?.industry}</p>
                        </div>
                    </div>
                    <h2>{job.jobTitle}</h2>
                    <p>Posted {daysSincePosted(job.posted_at)} ago</p>
                    <button id='apply-button' className='apply-button' onClick={submitApplication}>Quick Apply <LuSend /></button>
                    <p>< IoLocation size={30}/> {job.location}</p>
                    <p>< RiBuilding2Line size={30}/> {job.jobType}</p>
                    <p>< FaMoneyBillWave size={30}/> {formatSalary(job.salary)}</p>
                    <div className='job-description'>{job.jobDescription}</div>
                </>
                ) : (
                <p>Select a job to see the details</p>
                )}
            </div>
)};

export default StudentJobDetails;
