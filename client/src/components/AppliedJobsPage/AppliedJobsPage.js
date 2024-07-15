import React, { useEffect, useState } from 'react'
import './AppliedJobsPage.css';
import JobCard from './JobCard';
import Cookies from 'js-cookie';

function AppliedJobsPage() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const userCookie = JSON.parse(Cookies.get('student')? Cookies.get('student'): null);
    const studentUid = userCookie.uid; // Replace with actual student UID

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

        fetchApplications();
    }, [studentUid]);

    console.log(applications.length);
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="applied-jobs-page">
            <h1>Applied Jobs</h1>
            <div className="job-list">
                {applications.map(application => (
                    <JobCard application={application} />
                ))}
            </div>
        </div>
    );
}

export default AppliedJobsPage
