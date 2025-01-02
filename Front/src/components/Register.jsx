import { useRef, useState } from "react";
import axios from "axios";
import './Register.css';

const Register = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const [usernameMessage, setUsernameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [mobileMessage, setMobileMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  const register = async () => {
    const password = ref2.current.value;
    if (!validatePassword(password)) {
      setPasswordMessage("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8081/register", {
        "username": ref1.current.value,
        "password": password,
        "email": ref3.current.value,
        "mobilenumber": ref4.current.value,
        "role": "ROLE_USER"
      });
      console.log(res.response);
      const { data } = res;
      if (data) {
        setUsernameMessage("");
        setPasswordMessage("");
        setEmailMessage("");
        setMobileMessage("");
        setSuccessMessage("Registration Successful!");
      } else {
        setSuccessMessage("Registration Failed.");
      }
    } catch (error) {
      console.error(error.response.data);
      const { data } = error.response;
      if (data === `Username already exists: ${ref1.current.value}`) {
        setUsernameMessage(`${ref1.current.value} already exists. Please choose another username.`);
      } else if (data === `Email already exists: ${ref3.current.value}`) {
        setEmailMessage("Email already exists. Please choose another email.");
      }
    }
  };

  return (
    <>
      <div className="register1">
        <div><h3 className="title">Needs for you👋</h3></div>
        <br /><br /><br /><br />
        <div className="register_div">
          <h4 className="create">Create Account</h4>
          <br />
          <label className="lebel2">Enter username</label>
          <br />
          <input type="text" ref={ref1} placeholder="Enter username" className="login-input2" />
          {usernameMessage && <p className="message">{usernameMessage}</p>}
          <br /><br />
          <label className="lebel2">Enter password</label>
          <br />
          <input type="password" ref={ref2} placeholder="Enter password" className="login-input2" />
          {passwordMessage && <p className="message">{passwordMessage}</p>}
          <br /><br />
          <label className="lebel2">Email</label>
          <br />
          <input type="email" ref={ref3} placeholder="Enter Email Id" className="login-input2" />
          {emailMessage && <p className="message">{emailMessage}</p>}
          <br /><br />
          <label className="lebel2">Mobile number</label>
          <br />
          <input type="tel" ref={ref4} placeholder="Enter Mobile number" className="login-input2" />
          {mobileMessage && <p className="message">{mobileMessage}</p>}
          <br /><br />
          <button className="button2" onClick={register}>Continue</button>
          {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
      </div>
    </>
  );
};

export default Register;
