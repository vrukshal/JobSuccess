import React, { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import axios from 'axios';

const ProfileHeader = (props) => {
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
                const { key, recruiterUid, folderName, filename } = extractUrlParts(props.recruiter.logo);
                const response = await axios.get(`http://localhost:3001/api/recruiter/get-signed-url?filename=${filename}&folderName=${folderName}&recruiterUid=${recruiterUid}`);
                const { downloadUrl } = response.data;
                setImageUrl(downloadUrl);
            } catch (error) {
                console.error('Error fetching image URL:', error);
            }
        };

        fetchImageUrl();
    }, [props.recruiter.logo]);

    return (
        <div className="profile-header">
            <div className="profile-logo">
                {imageUrl && <img src={imageUrl} alt="Company Logo" />}
            </div>
            <div className="profile-description">
                <h1>{props.recruiter.name}</h1>
                <p>{props.recruiter.address}</p>
                <p>{props.recruiter.industry} | {props.recruiter.size} employees</p>
                <button>Follow</button>
            </div>
        </div>
    );
};

export default ProfileHeader;
