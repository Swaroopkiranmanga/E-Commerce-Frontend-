import './Login.css';
import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const navigate = useNavigate();
  
  const [error, setError] = useState(""); // Error message state

  const register = () => {
    navigate("/register");
  };

  const login = async () => {
    if(ref1.current && ref2.current){
      const username = ref1.current.value;
      const password = ref2.current.value;
      
      // Check if username and password are provided
      if(!username || !password){
        setError("Both fields are required.");
        return; // Prevent further execution
      }

      try {
        const res = await axios.post('http://localhost:8081/login', {
          "username": username,
          "password": password
        });

        const { data } = res;
        const { login } = data;

        if (login === "success") {
          const { role, token } = data;
          console.log(role);
          window.localStorage.setItem("token", token); // Store token in localStorage

          // Navigate based on role
          if (role === "ROLE_USER") {
            navigate("/"); // Redirect to homepage
          } else {
            navigate("/admindashboard"); // Redirect to error page if role doesn't match
          }
        } else {
          setError("Invalid login credentials.");
        }
      } catch (error) {
        setError("An error occurred while logging in.");
        console.log("Error:", error);
      }
    } else {
      setError("Enter credentials.");
    }
  };

  return (
    <>
      <div className='login1'>
        <div id="login-right">
          <h1>Login</h1>
          <div className="login-right-content">
            <label className='label1'>Username</label>
            <br />
            <input
              type="text" ref={ref1}
              placeholder="Enter username"
              className="login-input"
            />
            <br /><br />
            <label className='label1'>Password</label>
            <br />
            <input
              type="password"
              ref={ref2}
              placeholder="Enter Password"
              className="login-input"
            />
            <br /><br />
            {/* Display error if it exists */}
            {error && <div className="error-message">{error}</div>}
            <button className="login-button" onClick={login}><b>Login</b></button>
            <br /><br></br><br></br>
            <button className="login-button" onClick={register}><b>Register</b></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
