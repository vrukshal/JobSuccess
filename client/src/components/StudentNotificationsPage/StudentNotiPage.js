import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentNotiPage.css'; // Import the CSS file
import Cookies from 'js-cookie';
import StudentNavbar from '../StudentJobsPage/StudentNavbar';
import Sidebar from '../Sidebar';

function StudentNotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userCookie = JSON.parse(Cookies.get('student') ? Cookies.get('student') : null);
  const studentUid = userCookie ? userCookie.uid : null;

  useEffect(() => {
    console.log("StudentNotificationPage im in you")
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://${process.env.REACT_APP_API_URL}:3001/api/notifications?studentUid=${studentUid}`);
        setNotifications(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [studentUid]);

  if (loading) return <div className="notipage-loading">Loading...</div>;
  if (error) return <div className="notipage-error">Error: {error}</div>;

  return (
    <div className="student-page-container">
      <Sidebar />
      <div className="student-main-section-page">
        <StudentNavbar />
        <div className="main-container-to-fit-in-centre">
          <div className="notipage-notifications-container">
            <h1>Notifications</h1>
            <ul className="notipage-notifications-list">
              {notifications.map(notification => (
                <li key={notification.id} className={`notipage-notification-item ${notification.status}`}>
                  <p className="notipage-notification-date">Date: {new Date(notification.date).toLocaleString()}</p>
                  <p className="notipage-notification-message">Message: {notification.message}</p>
                  <p className="notipage-notification-status">Status: {notification.status}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentNotificationPage;
