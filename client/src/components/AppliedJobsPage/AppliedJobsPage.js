import React, { useEffect, useState } from 'react';
import './AppliedJobsPage.css';
import JobCard from './JobCard';
import Cookies from 'js-cookie';
import StudentNavbar from '../StudentJobsPage.js/StudentNavbar';
import Sidebar from '../Sidebar';

function AppliedJobsPage() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        keyword: '',
        applicationType: [],
        status: []
    });
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

    useEffect(() => {
        const fetchFilteredApplications = async () => {
            try {
                const queryParams = new URLSearchParams({
                    studentUid:studentUid,
                    // keyword: filters.keyword,
                    applicationType: filters.applicationType.join(','),
                    status: filters.status.join(',')
                }).toString();
                console.log(queryParams);
                const response = await fetch(`http://localhost:3001/api/application?${queryParams}`);
                const data = await response.json();
                setApplications(data.data);
            } catch (error) {
                console.error('Error fetching filtered applications:', error);
            }
        };

        if (studentUid) {
            fetchFilteredApplications();
        }
    }, [filters, studentUid]);

    const handleFilterChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFilters(prevFilters => {
            if (type === 'checkbox') {
                const updatedFilter = checked
                    ? [...prevFilters[name], value]
                    : prevFilters[name].filter(item => item !== value);
                return { ...prevFilters, [name]: updatedFilter };
            }
            return { ...prevFilters, [name]: value };
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="applied-jobs-page-container">
            <Sidebar />
            <div className="applied-jobs-page">
                <StudentNavbar />
                <h1>Applied Jobs</h1>
                <div className="filters">
                    <div className="filter-section">
                        <div className="filter-group">
                            
                            <div>
                                <h4>Application Type</h4>
                                <input
                                    type="checkbox"
                                    id="full-time"
                                    name="applicationType"
                                    value="full-time"
                                    checked={filters.applicationType.includes('full-time')}
                                    onChange={handleFilterChange}
                                />
                                <label htmlFor="full-time"> Full-time</label>
                                <input
                                    type="checkbox"
                                    id="part-time"
                                    name="applicationType"
                                    value="part-time"
                                    checked={filters.applicationType.includes('part-time')}
                                    onChange={handleFilterChange}
                                />
                                <label htmlFor="part-time"> Part-time</label>
                                <input
                                    type="checkbox"
                                    id="internship"
                                    name="applicationType"
                                    value="internship"
                                    checked={filters.applicationType.includes('internship')}
                                    onChange={handleFilterChange}
                                />
                                <label htmlFor="internship"> Internship</label>
                            </div>
                            <div>
                                <h4>Status</h4>
                                <input
                                    type="checkbox"
                                    id="pending"
                                    name="status"
                                    value="Pending"
                                    checked={filters.status.includes('Pending')}
                                    onChange={handleFilterChange}
                                />
                                <label htmlFor="pending"> Pending</label>
                                <input
                                    type="checkbox"
                                    id="reviewed"
                                    name="status"
                                    value="Reviewed"
                                    checked={filters.status.includes('Reviewed')}
                                    onChange={handleFilterChange}
                                />
                                <label htmlFor="reviewed"> Reviewed</label>
                                <input
                                    type="checkbox"
                                    id="declined"
                                    name="status"
                                    value="Declined"
                                    checked={filters.status.includes('Declined')}
                                    onChange={handleFilterChange}
                                />
                                <label htmlFor="declined"> Declined</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="applied-jobs-page-job-list">
                    {applications.map(application => (
                        <JobCard key={application.id} application={application} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AppliedJobsPage;
