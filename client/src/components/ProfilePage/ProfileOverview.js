import React from 'react';

const ProfileOverview = (props) => {
    return (
        <div className="profile-overview">
            <h2>About {props.recruiter.company}</h2>
            <p>
                {props.recruiter.description}
            </p>
        </div>
    );
};

export default ProfileOverview;
