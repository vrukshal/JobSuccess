import React, { useEffect, useState } from 'react';
import './SavedJobsPage.css';
import SavedJobCard from './SavedJobCard';
import Cookies from 'js-cookie';
import StudentNavbar from '../StudentJobsPage/StudentNavbar';
import Sidebar from '../Sidebar';
import { IoIosSearch } from "react-icons/io";

function SavedJobsPage() {
    const [jobType, setJobType] = useState('full-time');
    const [searchQuery, setSearchQuery] = useState('');

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        keyword: '',
        savedJobType: [],
        status: []
    });
    const userCookie = JSON.parse(Cookies.get('student') ? Cookies.get('student') : null);
    const studentUid = userCookie ? userCookie.uid : null;

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch(`http://${process.env.REACT_APP_API_URL}:3001/api/jobs/getSavedJobs?StudentID=${studentUid}`);
                const data = await response.json();
                setApplications(data || []); // Ensure applications is an array
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
                    StudentID:studentUid,
                    // keyword: filters.keyword,
                    savedJobType: filters.savedJobType.join(','),
                }).toString();
                console.log(queryParams);
                const response = await fetch(`http://${process.env.REACT_APP_API_URL}:3001/api/jobs/getSavedJobs?${queryParams}`);
                const data = await response.json();
                setApplications(data);
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

    console.log('Applications to be mapped:', applications);

    return (
        <div className="student-page-container">
            <Sidebar />
            <div className="student-section-main-page">
                <StudentNavbar />
                
            {/* </div> */}
                <div className="jobs-search-filter">
                    {/* <input type="text" placeholder="Search jobs" /> */}
                    <div className="search-bar">
                        <input 
                        type="text" 
                        placeholder="Search jobs" 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        />
                        <button type="submit">
                            < IoIosSearch size={30} style={{ color: "black" }}/>
                        </button>
                    </div>
                    <button onClick={() => setJobType('full-time')}>Full-time</button>
                    <button onClick={() => setJobType('part-time')}>Part-time</button>
                    <button onClick={() => setJobType('internship')}>Internship</button>
                    <button onClick={() => setJobType('remote')}>Remote</button>
                </div>

                <div className="main-container-to-fit-in-centre">
                    <div className="saved-jobs-page">
                        <h1>Saved Jobs</h1>
                        <div className="saved-filters">
                            <div className="saved-filter-section">
                                <div className="saved-filter-group">
                                    
                                    <div>
                                        <h4>Application Type</h4>
                                        {/* <input
                                            type="checkbox"
                                            id="full-time"
                                            name="applicationType"
                                            value="full-time"
                                            checked={filters.applicationType.includes('full-time')}
                                            onChange={handleFilterChange}
                                        /> */}
                                        {/* <label htmlFor="full-time"> Full-time</label>  */}
                                        <input
                                            type="checkbox"
                                            id="job"
                                            name="applicationType"
                                            value="job"
                                            checked={filters.savedJobType.includes('job')}
                                            onChange={handleFilterChange}
                                        />
                                        <label htmlFor="Job"> Job </label>
                                        <input
                                            type="checkbox"
                                            id="internship"
                                            name="applicationType"
                                            value="internship"
                                            checked={filters.savedJobType.includes('internship')}
                                            onChange={handleFilterChange}
                                        />
                                        <label htmlFor="internship"> Internship</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="saved-jobs-page-job-list">
                        {applications.map(application => (
                            <SavedJobCard key={application.id} savedJob={application} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );  
}


export default SavedJobsPage;