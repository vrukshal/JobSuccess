// src/pages/AppliedJobsPage.js

import React, { useEffect, useState } from 'react';
import './AppliedJobsPage.css';
import JobCard from './JobCard';
import Cookies from 'js-cookie';
import StudentNavbar from '../StudentJobsPage.js/StudentNavbar'; // Corrected import path
import Sidebar from '../Sidebar';

function AppliedJobsPage() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const userCookie = JSON.parse(Cookies.get('student') ? Cookies.get('student') : null);
    const studentUid = userCookie ? userCookie.uid : null;

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/application?studentUid=${studentUid}`);
                const data = await response.json();
                setApplications(data.data);
            } catch (error) {
                console.error('Error fetching applications:', error);
            } finally {
                setLoading(false);
            }
        };

        if (studentUid) {
            fetchApplications();
        }
    }, [studentUid]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Sidebar />
            <div className="applied-jobs-page">
                <StudentNavbar />
                <h1>Applied Jobs</h1>
                <div className="job-list">
                    {applications.map(application => (
                        <JobCard key={application.id} application={application} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AppliedJobsPage;
