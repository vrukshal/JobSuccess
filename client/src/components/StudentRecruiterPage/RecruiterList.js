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
            <div className="recruiter-list-content">
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
    const handleFollow = () => {
        // Implement follow functionality here
        console.log(`Following ${recruiter.name}`);
    };

    return (
        <div className="recruiter-card">
         {recruiter.logo && <img className="recruiter-logo" src={recruiter.logo} alt="Profile" />}
           
            <div className="recruiter-info">
                <h3>{recruiter.name}</h3>
                <p>{recruiter.industry}</p>
                <button onClick={handleFollow}>Follow</button>
            </div>
        </div>
    );
};

export default RecruiterList;
