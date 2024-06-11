import React from 'react';

const JobsSection = (props) => {
    return (
        <div className="jobs-section">
            <h3>Jobs at {props.recruiter.company}</h3>
            <p>No job posts</p>
            <p>Follow {props.recruiter.company} to receive notifications when new jobs are posted.</p>
        </div>
    );
};

export default JobsSection;
