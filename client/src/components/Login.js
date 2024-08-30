import React, { useEffect } from 'react'
import "./css/Login.css"
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Login() {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuth = () => {
            const storedUser = Cookies.get('user');
            if (storedUser) {
                dispatch(setUser(JSON.parse(storedUser)));
                navigate('/profile');
            }
        };
        checkAuth();
    }, [user, dispatch, navigate]);
    
    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://${process.env.REACT_APP_API_URL}:3001/api/auth/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            dispatch(setUser(data));
            Cookies.set('user', JSON.stringify(data)); // Save user data in cookies
          } catch (error) {
            console.error('Error logging in:', error);
          }
    }

    return (
      <div className="login-container">
        <div className="login-left">
          <h1>JobSuccess</h1>
          <h2>Get the job done</h2>
          <ul>
            <li><strong>Students:</strong> Launch the next step in your career.</li>
            <li><strong>Employers:</strong> Hire the next generation of talent.</li>
            <li><strong>Career Centers:</strong> Bring the best jobs to your students.</li>
          </ul>
          <a href="#learn-more">Learn More</a>
        </div>
        <div className="login-right">
          <h2>Sign in</h2>
          <hr />
          <div>
            <p>Please sign in with your email.</p>
            <input type="email" placeholder="email@example.edu" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={loginUser}>Log in</button>
          </div>
          <p>Not a user?{" "}
                <a href='/signup'>Sign up now</a>
            </p>
        </div>
      </div>
    );
  }

export default Login;
