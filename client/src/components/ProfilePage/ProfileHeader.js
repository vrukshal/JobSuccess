import React from 'react';

const ProfileHeader = (props) => {
    return (
        <div className="profile-header">
            <h1>{props.recruiter.company}</h1>
            <p>{props.recruiter.address}</p>
            <p>{props.recruiter.industry} | {props.recruiter.size} employees</p>
            <button>Follow</button>
        </div>
    );
};

export default ProfileHeader;
