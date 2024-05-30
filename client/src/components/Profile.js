import React, { useState } from 'react';
import './css/Profile.css';

function Profile() {
  const [userType, setUserType] = useState('');
  const [formVisible, setFormVisible] = useState(false);

  const handleContinue = () => {
    if (userType) {
      setFormVisible(true);
    }
  };

  return (
    <div className="profile-container">
      <div className="image-section1">
        <img src="https://recruithire.com/images/blog/best-recruiting-software.png?v=1684327425115465319" alt="Job seekers" className="profile-image" />
      </div>
      <div className="form-section1">
        <header className="profile-header">
          {/* <img src="/mnt/data/image.png" alt="JobSuccess Logo" className="profile-logo" /> */}
          <h1>JobSuccess</h1>
        </header>
        <div className="form-content">
          {!formVisible ? (
            <div className="selection-section">
              <h2>Find your path</h2>
              <p>Select your role to continue</p>
              <form className="type-form">
                <label htmlFor="usertype">Are you a student or a recruiter?</label>
                <select
                  name="usertype"
                  id="usertype"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="student">Student</option>
                  <option value="recruiter">Recruiter</option>
                </select>
                <button type="button" onClick={handleContinue} className="continue-button">
                  Continue
                </button>
              </form>
            </div>
          ) : (
            <div className="details-form-section">
              {userType === 'student' ? (
                <form className="details-form">
                  <h2>Student Details</h2>
                  <label>
                    Birthdate
                    <input type="date" name="birthdate" />
                  </label>
                  <label>
                    School
                    <input type="text" name="school" />
                  </label>
                  <label>
                    Degree
                    <input type="text" name="degree" />
                  </label>
                  <label>
                    Education
                    <input type="text" name="education" />
                  </label>
                  <label>
                    Experience
                    <input type="text" name="experience" />
                  </label>
                  <button type="submit" className="submit-button">
                    Submit
                  </button>
                </form>
              ) : (
                <form className="details-form">
                  <h2>Recruiter Details</h2>
                  <label>
                    Company Name
                    <input type="text" name="company" />
                  </label>
                  <label>
                    Company Address
                    <input type="text" name="address" />
                  </label>
                  <label>
                    Company Size
                    <input type="number" name="size" />
                  </label>
                  <label>
                    Industry
                    <input type="text" name="industry" />
                  </label>
                  <label>
                    Role in Company
                    <input type="text" name="role" />
                  </label>
                  <button type="submit" className="submit-button">
                    Submit
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
