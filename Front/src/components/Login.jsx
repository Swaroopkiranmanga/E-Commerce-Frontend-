import './Login.css';
import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleChange = () => {
    console.log("Enter your correct phone number or email");
  };

  const register = () => {
    navigate("/register");
  };
  
  const login = async () => {
    try {
      const res = await axios.post('http://localhost:8081/login', {
        "username": ref1.current.value,
        "password": ref2.current.value,
        "inputValue": ref3.current.value
      });

      const { data } = res;
      const { login } = data;

      if (login === "success") {
        const { role, token } = data;
        console.log(role);
        window.localStorage.setItem("token", token);
        role === "ROLE_USER" ? navigate("/dashboard") : console.log("/error");
      } else {
        setError("Invalid login credentials");
        console.log("Error: Invalid credentials");
      }
    } catch (error) {
      setError("An error occurred while logging in.");
      console.log("Error:", error);
    }
  };


  const forget = () => {
    console.log("forgot password");
  };

  return (
    <>
    <div className='login1'>
        <div id="login-right">
                        <h1>Login</h1>
          <div className="login-right-content">
            <label1>Mobile number or email</label1>
            <br />
            <input
              type="text"
              ref={ref3}
              onChange={handleChange}
              placeholder="Enter your phone number or email ID"
              id="login-input"
            />
            <br /><br />
            <label1>Password</label1>
            <br />
            <input
              type="password"
              ref={ref2}
              placeholder="Enter Password"
              id="login-input"
            />
            <br /><br />
            <button className="login-button" onClick={login}><b>Login</b></button>
            <br />
            <div className="login-actions">
              <a href="#" className="login-forgot-link">Forgot Password</a>
            </div>
            <br />
            <button className="login-button" onClick={register}><b>Register</b></button>
          </div>
        {/* </div> */}
      </div>
      </div>
    </>
  );
};

export default Login;