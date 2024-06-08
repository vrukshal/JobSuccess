import React from 'react';

const ProfileOverview = (props) => {
    return (
        <div className="profile-overview">
            <h2>About {props.recruiter.company}</h2>
            <p>
                Computer Service Professionals, Inc. (CSPI) was founded in 1988 and has been installing and supporting item processing systems ever since.
                In 1994 we became a business partner and authorized reseller of BancTec reader-sorters and began developing our original proof-of-deposit software soon thereafter.
                Since that time, CSPI has gained over 400 software and hardware customers throughout the United States.
            </p>
            <p>
                As a software and service provider, CSPI has always focused on the needs of today’s progressive community banks.
                CSPI is valued by banks around the country as a technology partner and for providing easy-to-use software and hardware solutions that significantly increase productivity.
            </p>
        </div>
    );
};

export default ProfileOverview;
