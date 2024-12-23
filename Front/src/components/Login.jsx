import './Login.css';
import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
const Login = () => {

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const navigate = useNavigate();

  const handleChange = () => {
    console.log("enter your correct phonenumber or email");
  }
  const resetForm = () => {
    console.log("reset your details")
  }

  const login = async () => {
    await axios.post('http://localhost:8081/login', { "username": ref1.current.value, "password": ref2.current.value, "inputValue": ref3.current.value });
    const { data } = res;
    const { login } = data;
    if (login == "success") {
      const { role, token } = data;
      console.log(role);
      //store token to localStorage
      window.localStorage.setItem("token", token);
      role == "ROLE_USER" ? navigate("/dashboard") : console.log("/error ");

    } else {
      console.log("error")
    }


  }
  return (
    <>
      <>
        <div className='login_page'>
          <fieldset className="login">
            <legend>Login form</legend>

            <input type="test" ref={ref1} placeholder="enter username"></input>
            <input type="test" ref={ref3} onChange={handleChange} placeholder='Enter your phone number or email ID'></input>
            <br></br><br></br>

            <input type="password" ref={ref2} placeholder="enter password"></input>
            <br></br><br></br>
            <button onClick={login}>Login</button>

            {/* Reset button with onClick event */}
            <button onClick={resetForm}>Reset</button>
          </fieldset>
        </div>
      </>
    </>
  )
}
export default Login;