import React from 'react';

const ContactInformation = (props) => {
    return (
        <div className="contact-information">
            <h3>Contact Information</h3>
            <p>Website: <a href={props.recruiter.website} target="_blank" rel="noopener noreferrer">{props.recruiter.website}</a></p>
            <p>Phone: {props.recruiter.phone}</p>
        </div>
    );
};

export default ContactInformation;
