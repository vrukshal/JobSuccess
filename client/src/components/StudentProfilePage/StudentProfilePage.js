import React, { useEffect, useState } from 'react'
import './StudentProfilePage.css';
import Sidebar from '../Sidebar';
import Cookies from 'js-cookie';
import axios from 'axios';
function StudentProfilePage() {


    const studentCookie = JSON.parse(Cookies.get('student'));
    console.log(studentCookie);

    const [imageUrl, setImageUrl] = useState('');

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
        const fetchImageUrl = async () => {
            try {
                const { key, recruiterUid, folderName, filename } = extractUrlParts(studentCookie.photoUrl);
                const response = await axios.get(`http://localhost:3001/api/applicant/get-signed-url?filename=${filename}&folderName=${folderName}&studentUid=${recruiterUid}`);
                const { downloadUrl } = response.data;
                setImageUrl(downloadUrl);
            } catch (error) {
                console.error('Error fetching image URL:', error);
            }
        };

        fetchImageUrl();
    }, [studentCookie]);
  return (
    <>
    <Sidebar />      
    <div class="student-profile-container">
        
            {/* <img src="https://images.unsplash.com/photo-1503924087716-07cbd5f49b21?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /> */}

        <div class="header">
           
            {imageUrl && <img className="profile-picture" src={imageUrl} alt="Company Logo" />}
        </div>
        <div class="profile-info">  
            <h1>{studentCookie.firstName} {studentCookie.lastName} <span class="pronouns">(He/Him)</span></h1>
            <p>{studentCookie.currentRole} @ {studentCookie.currentCompany}</p>
            <p class="location">{studentCookie.location} • <a href="#">{studentCookie.linkedInUrl}</a></p>
            <p class="connections">500+ connections</p>
            <div class="education">
                {/* <img src="asu_logo.png" alt="Arizona State University">
                <img src="asu_logo.png" alt="Arizona State University"> */}
            </div>
        </div>
    </div>
    </>
  )
}

export default StudentProfilePage
