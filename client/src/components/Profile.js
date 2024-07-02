import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './css/Profile.css';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { fetchRecruiterData } from '../actions/recruiterActions';
import Cookies from 'js-cookie';
import { jobTitles } from './jobTitles'

function Profile() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [userType, setUserType] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [sizeVal, setSizeVal] = useState(1);
  const [studentFormData, setStudentFormData] = useState({
    firstName: '',
    lastName: '',
    date: '',
    email: '',
    phoneNumber: '',
    linkedInUrl: '',
    photoUrl: '',
    currentRole: '',
    currentCompany: '',
    location: ''
  });

  const [recruiterFormData, setRecruiterFormData] = useState({
    name: '',
    experience: '',
    company: '',
    address: '',
    size: '',
    industry: '',
    role: '',
    description: '',
    logo: '',
    email: '',
    website: '',
    location: '',
    phone: '',
    uid: user.uid
  });

  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();
  console.log(user);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('https://countriesnow.space/api/v0.1/countries')
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          const countryList = data.data.map(country => country.country);
          setCountries(countryList);
        }
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  useEffect(() => {
    const checkUserProfile = async () => {
      if (!user) {
        navigate('/login');
      } else {
        try {
          const [res, snap] = await userProfileIsCompleted(user);
          if (res) {
            if (res === "applicant") {
              Cookies.set('student', JSON.stringify(snap));
              navigate('/stu');
            } else if (res === "recruiter") {
              Cookies.set('recruiter', JSON.stringify(snap));
              navigate('/rec');
            }
          } else {
            navigate('/profile');
          }
        } catch (error) {
          console.error("Error checking user profile: ", error);
        }
      }
    };

    checkUserProfile();
  }, [user]);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSizeChange = (e) => {
    setSizeVal(e.target.value)
    const range = {
      1: 100,
      2: 1000,
      3: 10000,
      4: 25000,
      5: 50000,
      6: 100000,
      7: 200000
    }
    setRecruiterFormData({
      ...recruiterFormData,
      size: range[parseInt(e.target.value)]
    });
    console.log(recruiterFormData);
  };

  const getSizeLabel = (size) => {
    if (size <= 100) return '1-100';
    if (size <= 1000) return '100-1000';
    if (size <= 10000) return '1000-10000';
    if (size <= 25000) return '10000-25000';
    if (size <= 50000) return '25000-50000';
    if (size <= 100000) return '50000-100000';
    return '100000-200000';
  };

  async function userProfileIsCompleted(userData) {
    const uid = userData.uid;
    const checkApplicant = doc(db, "StudentProfiles", uid);
    const checkRecruiter = doc(db, "EmployerProfiles", uid);
    const applicantSnap = await getDoc(checkApplicant);
    const recruiterSnap = await getDoc(checkRecruiter);
    if(applicantSnap.exists()){
      return ["applicant", applicantSnap.data()];
    }
    if(recruiterSnap.exists()){
      return ["recruiter", recruiterSnap.data()];
    }
    return [false, null];
  }

  const handleContinue = () => {
    if (userType) {
      setFormVisible(true);
    }
  };

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudentFormData({
      ...studentFormData,
      [name]: value
    });

    if (name === 'currentRole') {
      const filteredSuggestions = jobTitles.filter(title =>
        title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  };

  const handleRecruiterChange = (e) => {
    const { name, value } = e.target;
    setRecruiterFormData({
      ...recruiterFormData,
      [name]: value
    });

    // Handle job title suggestions
    if (name === 'role') {
      const filteredSuggestions = jobTitles.filter(title =>
        title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  };

  const handleRecruiterSuggestionClick = (suggestion) => {
    setRecruiterFormData({
      ...recruiterFormData,
      role: suggestion
    });
    setSuggestions([]);
  };

  const handleStudentSuggestionClick = (suggestion) => {
    setStudentFormData({
      ...studentFormData,
      currentRole: suggestion
    });
    setSuggestions([]);
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    if (!user) return; // Ensure user is authenticated

    const formData = new FormData();
    formData.append('filename', studentFormData.photoUrl.name);
    formData.append('filetype', studentFormData.photoUrl.type);
    formData.append('folderName', "photos");
    formData.append('file', studentFormData.photoUrl);
    formData.append('uid', studentFormData.uid);

    console.log(formData);
    const response = await fetch('http://localhost:3001/api/applicant/fileupload', {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();
    
    const applicantInfo = {
      ...studentFormData,
      photoUrl: data.fileUrl,
      uid: user.uid,
    };

    console.log(applicantInfo);
    try {
      const response = await fetch('http://localhost:3001/api/applicant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicantInfo),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Profile created:', data);
      Cookies.set('student', JSON.stringify(data));
      navigate('/stu');
      // Redirect or show success message
    } catch (error) {
      console.error('Error creating profile:', error);
      // Show error message
    }
  };

  const handleRecruiterSubmit = async (e) => {
    e.preventDefault();
    if (!user) return; // Ensure user is authenticated

    const formData = new FormData();
    formData.append('filename', recruiterFormData.logo.name);
    formData.append('filetype', recruiterFormData.logo.type);
    formData.append('folderName', "logo");
    formData.append('file', recruiterFormData.logo);
    formData.append('uid', recruiterFormData.uid);

    console.log(formData);
    const response = await fetch('http://localhost:3001/api/recruiter/fileupload', {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();

    const recruiterInfo = {
      ...recruiterFormData,
      logo: data.fileUrl,
      uid: user.uid,
    };

    console.log(recruiterInfo);
    try {
      const response = await fetch('http://localhost:3001/api/recruiter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recruiterInfo),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Profile created:', data);
      // dispatch(setUser(data));
      dispatch(fetchRecruiterData(recruiterInfo.uid));
      Cookies.set('recruiter', JSON.stringify(data));
      const recruiterCookie = Cookies.get('recruiter');
      console.log(recruiterCookie);
      navigate('/rec');
    } catch (error) {
      console.error('Error creating profile:', error);
      // Show error message
    }
  };

  const handleFileChange = (e) => {
    setRecruiterFormData({
      ...recruiterFormData,
      logo: e.target.files[0]
    });
  };


  const handleStudentPhotoChange = (e) => {
    setStudentFormData({
      ...studentFormData,
      photoUrl: e.target.files[0]
    });
  }

  return (
    <div className="profile-container">
      <div className="image-section1">
        <img src="https://recruithire.com/images/blog/best-recruiting-software.png?v=1684327425115465319" alt="Job seekers" className="profile-image" />
      </div>
      <div className="form-section1">
        <header className="profile-header">
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
                <form className="details-form" onSubmit={handleStudentSubmit}>
                  <h2>Student Details</h2>
                  <label>
                    First Name
                    <input type="text" name="firstName" value={studentFormData.firstName} onChange={handleStudentChange}/>
                  </label>
                  <label>
                    Last Name
                    <input type="text" name="lastName" value={studentFormData.lastName} onChange={handleStudentChange}/>
                  </label>
                  <label>
                    Birthdate
                    <input type="date" name="date" value={studentFormData.date} onChange={handleStudentChange}/>
                  </label>
                  <label>
                        Upload Photo
                        <input type='file' className="form-control" onChange={handleStudentPhotoChange} />
                        </label>
                      <label>
                        Email
                        <input type="email" className="form-control" name="email" value={studentFormData.email} onChange={handleStudentChange}/>
                      </label>
                      <label>
                        LinkedIn URL
                        <input type="text" name="linkedInUrl" value={studentFormData.linkedInUrl} onChange={handleStudentChange}/>
                      </label>

                      <label>
                        Current Role
                        <input type="text" name="currentRole" value={studentFormData.currentRole} onChange={handleStudentChange}/>
                      </label>
                      {suggestions.length > 0 && (
                          <ul className="suggestions">
                            {suggestions.map((suggestion, index) => (
                              <li key={index} onClick={() => handleStudentSuggestionClick(suggestion)}>
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        )}
                      <label>
                        Current Company/University
                        <input type="text" name="currentCompany" value={studentFormData.currentCompany} onChange={handleStudentChange}/>
                      </label>

                      <label>Location</label>
                      <select name="location" className="form-control" value={studentFormData.location} onChange={handleStudentChange}>
                        <option value="">Select a country</option>
                        {countries.map((country, index) => (
                          <option key={index} value={country}>{country}</option>
                        ))}
                      </select>

                  <button type="submit" className="submit-button">
                    Submit
                  </button>
                </form>
              ) : (
                <>
                  {step === 1 && (
                    <form className="form-group">
                      <h2>Recruiter Details</h2>
                      <label>
                        Name
                        <input type="text" name="name" value={recruiterFormData.name} onChange={handleRecruiterChange}/>
                      </label>
                      <label>
                        Brief Introduction
                        <input type="text" name="description" value={recruiterFormData.description} onChange={handleRecruiterChange}/>
                      </label>
                      <label>
                        Role in Company
                        <input type="text" name="role" value={recruiterFormData.role} onChange={handleRecruiterChange}/>
                        {/* Display suggestions */}
                        {suggestions.length > 0 && (
                          <ul className="suggestions">
                            {suggestions.map((suggestion, index) => (
                              <li key={index} onClick={() => handleRecruiterSuggestionClick(suggestion)}>
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        )}
                      </label>
                      <label>
                        Years worked with the company
                        <input type="text" name="experience" value={recruiterFormData.experience} onChange={handleRecruiterChange}/>
                      </label>
                      <button type="button" className="submit-button" onClick={nextStep}>
                        Next
                      </button>
                    </form>
                  )}
                  {step === 2 && (
                    <form className="form-group" onSubmit={handleRecruiterSubmit}>
                      <h2>Company Details</h2>
                      <label>
                        Company Name
                        <input type="text" name="company" value={recruiterFormData.company} onChange={handleRecruiterChange}/>
                      </label>
                      <label>
                        Size
                        <input className="slider" type="range" min="1" max="7" step="1" value={sizeVal} onChange={handleSizeChange} />
                        <span>{getSizeLabel(recruiterFormData.size)} employees</span>
                      </label>
                      <label>
                        Address
                        <input type="text" name="address" value={recruiterFormData.address} onChange={handleRecruiterChange}/>
                      </label>
                      <label>
                        Industry
                        <input type="text" name="industry" value={recruiterFormData.industry} onChange={handleRecruiterChange}/>
                      </label>
                      <label>
                        Logo URL
                        <input type='file' className="form-control" onChange={handleFileChange} />
                        </label>
                      <label>
                        Email
                        <input type="email" className="form-control" name="email" value={recruiterFormData.email} onChange={handleRecruiterChange}/>
                      </label>
                      <label>
                        Website
                        <input type="text" name="website" value={recruiterFormData.website} onChange={handleRecruiterChange}/>
                      </label>
                      <label>Location</label>
                      <select name="location" className="form-control" value={recruiterFormData.location} onChange={handleRecruiterChange}>
                        <option value="">Select a country</option>
                        {countries.map((country, index) => (
                          <option key={index} value={country}>{country}</option>
                        ))}
                      </select>
                      <label>
                        Phone Number
                        <input type="tel" className="form-control" name="phone" value={recruiterFormData.phone} onChange={handleRecruiterChange}/>
                      </label>
                      <button type="button" className="back-button" onClick={prevStep}>
                        Back
                      </button>
                      <button type="submit" className="submit-button">
                        Submit
                      </button>
                    </form>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
