import React from 'react';

const ContactInformation = (props) => {
    return (
        <div className="contact-information">
            <h3>Contact Information</h3>
            <p>Website: <a href={props.recruiter.companyurl} target="_blank" rel="noopener noreferrer">{props.companyurl}</a></p>
            <p>Phone: {props.phoneNumber}</p>
        </div>
    );
};

export default ContactInformation;
