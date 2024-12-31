// import './Login.css';
// import { useRef, useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//   const ref1 = useRef(null);
//   const ref2 = useRef(null);
//   const ref3 = useRef(null);

//   const navigate = useNavigate();

//   const [error, setError] = useState("");

//   const handleChange = () => {
//     console.log("Enter your correct phone number or email");
//   };

//   const register = () => {
//     navigate("/register");
//   };
  
//   const login = async () => {
//     try {
//       const res = await axios.post('http://localhost:8081/login', {
//         "username": ref1.current.value,
//         "password": ref2.current.value,
//         "inputValue": ref3.current.value
//       });

//       const { data } = res;
//       const { login } = data;

//       if (login === "success") {
//         const { role, token } = data;
//         console.log(role);
//         window.localStorage.setItem("token", token);
//         role === "ROLE_USER" ? navigate("/dashboard") : console.log("/error");
//       } else {
//         setError("Invalid login credentials");
//         console.log("Error: Invalid credentials");
//       }
//     } catch (error) {
//       setError("An error occurred while logging in.");
//       console.log("Error:", error);
//     }
//   };


//   const forget = () => {
//     console.log("forgot password");
//   };

//   return (
//     <>
//     <div className='login1'>
//         <div id="login-right">
//                         <h1>Login</h1>
//           <div className="login-right-content">
//             <label1>Mobile number or email</label1>
//             <br />
//             <input
//               type="text"
//               ref={ref3}
//               onChange={handleChange}
//               placeholder="Enter your phone number or email ID"
//               id="login-input"
//             />
//             <br /><br />
//             <label1>Password</label1>
//             <br />
//             <input
//               type="password"
//               ref={ref2}
//               placeholder="Enter Password"
//               id="login-input"
//             />
//             <br /><br />
//             <button className="login-button" onClick={login}><b>Login</b></button>
//             <br />
//             <div className="login-actions">
//               <a href="#" className="login-forgot-link">Forgot Password</a>
//             </div>
//             <br />
//             <button className="login-button" onClick={register}><b>Register</b></button>
//           </div>
//         {/* </div> */}
//       </div>
//       </div>
//     </>
//   );
// };

// export default Login;

// import './Login.css';
// import { useRef, useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//   const refUsername = useRef(null);
//   const refPassword = useRef(null);

//   const navigate = useNavigate();
//   const [error, setError] = useState("");

//   const login = async () => {
//     try {
//       const res = await axios.post('http://localhost:8081/login', {
//         "username": refUsername.current.value,
//          "password": refPassword.current.value,
//       });

//       const { data } = res;
//       const { login, role, token } = data;

//       if (login === "success") {
//         // Save token to localStorage
//         window.localStorage.setItem("token", token);
//         // Navigate based on user role
//         role === "ROLE_USER" ? navigate("/NavBar") : navigate("/Admin");
//       } else {
//         setError("Invalid login credentials");
//       }
//     } catch (error) {
//       setError("An error occurred while logging in.");
//       console.error("Error:", error);
//     }
//   };

//   const register = () => {
//     navigate("/register");
//   };

//   return (
//     <div className='login1'>
//       <div id="login-right">
//         <h1>Login</h1>
//         <div className="login-right-content">
//           <label>Username</label>
//           <input
//             type="text"
//             ref={refUsername}
//             placeholder="Enter your username"
//             id="login-input"
//           />
//           <br />
//           <label>Password</label>
//           <input
//             type="password"
//             ref={refPassword}
//             placeholder="Enter Password"
//             id="login-input"
//           />
//           <br />
//           <button className="login-button" onClick={login}>Login</button>
//           <div className="login-actions">
//             <button onClick={register} className="login-register-button">Register</button>
//           </div>
//           {error && <p className="error-message">{error}</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


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
            navigate("/error"); // Redirect to error page if role doesn't match
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