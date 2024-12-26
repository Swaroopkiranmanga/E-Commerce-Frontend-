import { useRef } from "react";
import axios from "axios";
import './Register.css';
import { Form } from 'react-bootstrap';  // If using react-bootstrap
import { useNavigate } from "react-router-dom";
const Register = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
   const ref4 = useRef(null);
   const ref5 = useRef(null);


  const register = async () => {
    try {
      const res = await axios.post("http://localhost:8081/admin/register", {
        "username": ref1.current.value,
        "password": ref2.current.value,
        "number or email":ref3.current.value,
        "Re-enter password":ref4.current.value,
        "role": ref5.current.value
      }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });

      const { data } = res;
      if (data != null) {
        alert("Registration Success !!!");
      } else {
        alert("Registration Failed !!!");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration Failed due to an error.");
    }
  };
  const home = ()=>{
    navigate = "/";
  }

  return (
    <>
     <div className="register1">
      
       
      
      <div><h3 className="title">Needs for you👋 </h3></div>
      <br></br><br></br>
     <br></br><br></br>
      <div className="register_div ">
       <h4 className="create">Create Account</h4>
       <br></br>
        <label className="lebel2">Enter username</label>
        <br></br>
        <input type="text" ref={ref1} placeholder="Enter username"  id="login-input2" />
        <br></br><br></br>
        <label  className="lebel2">Enter password</label>
        <br></br>
        <input type="password" ref={ref3} placeholder="Enter password"  id="login-input2" />
        <br></br><br></br>
       
       <label  className="lebel2">Email</label>
       <br></br>
       <input type="email" ref={ref4} placeholder="Enter Email Id"  id="login-input2" />
        <br></br>
        <br></br>
        <label  className="lebel2">Mobile number </label>
        <br></br>
        <input type="tel" ref={ref2} placeholder=" Enter Mobile number "   id="login-input2"/>
        <br></br><br></br>
        <button className="button2" onClick={register}>Continue</button>
      </div>
      </div>
    </>
  );
};

export default Register;
