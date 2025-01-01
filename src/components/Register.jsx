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

  const register = async () => {
    try {
      const res = await axios.post("http://localhost:8081/register", {
        "username": ref1.current.value,
        "password": ref2.current.value,
        "email": ref3.current.value,
        "mobilenumber": ref4.current.value,
        "role": "ROLE_USER"
      });
      console.log(res.response);
      const { data } = res;
      console.log(data);
      if (data === `Username already exists: ${ref1.current.value}`) {
        setUsernameMessage("Username already exists. Please choose another username.");
      }else if(data === `Email already exists: ${ref3.current.value}`){
        setEmailMessage("email already exists. Please choose another email");
      }
       else if (data) {
        setUsernameMessage("Registration Success !!!");
        setPasswordMessage("Registration Success !!!");
        setEmailMessage("Registration Success !!!");
        setMobileMessage("Registration Success !!!");
      } else {
        setUsernameMessage("Registration Failed !!!");
        setPasswordMessage("Registration Failed !!!");
        setEmailMessage("Registration Failed !!!");
        setMobileMessage("Registration Failed !!!");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      console.log(error.response)
      setUsernameMessage("Registration Failed due to an error.");
      setPasswordMessage("Registration Failed due to an error.");
      setEmailMessage("Registration Failed due to an error.");
      setMobileMessage("Registration Failed due to an error.");
    }
  };

  return (
    <>
      <div className="register1">
        <div><h3 className="title">Needs for you👋 </h3></div>
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
        </div>
      </div>
    </>
  );
};

export default Register;