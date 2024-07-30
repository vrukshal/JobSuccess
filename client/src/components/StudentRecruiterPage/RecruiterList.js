import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StudentNavbar from '../StudentJobsPage.js/StudentNavbar';
import Sidebar from '../Sidebar';

import './RecruiterList.css';

const RecruiterList = () => {
    const [recruiters, setRecruiters] = useState([]);

 

      

  
    useEffect(() => {
        const fetchRecruiters = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/recruiter/recruiterlist');
                setRecruiters(response.data);
            } catch (error) {
                console.error('Error fetching recruiters:', error);
            }
        };

        fetchRecruiters();
    }, []);

    return (
        <div className="page-container">
            <Sidebar />
            <div className="content">
                <StudentNavbar />
                <div className="recruiter-list">
                    {recruiters.map(recruiter => (
                        <RecruiterCard key={recruiter.uid} recruiter={recruiter} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const RecruiterCard = ({ recruiter }) => {


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
  

      const getSignedUrl = async (url) => {
        try {
            const { key, recruiterUid, folderName, filename } = extractUrlParts(url);
           
            const response = await axios.get(`http://localhost:3001/api/recruiter/get-signed-url?filename=${filename}&folderName=${folderName}&recruiterUid=${recruiterUid}`);
            const { downloadUrl } = response.data;
            console.log(downloadUrl);
            return downloadUrl;
          } catch (error) {
            console.error('Error fetching image URL:', error);
          }
    };

    const handleFollow = () => {
        // Implement follow functionality here
        console.log(`Following ${recruiter.name}`);
    };

    return (
        <div className="recruiter-card">
         <img className="recruiter-logo" src={getSignedUrl(recruiter.logo)} alt="Profile" />
           
            <div className="recruiter-info">
                <h3>{recruiter.name}</h3>
                <p>{recruiter.industry}</p>
                <button onClick={handleFollow}>Follow</button>
            </div>
        </div>
    );
};

export default RecruiterList;
