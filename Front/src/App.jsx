// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// import NavBar from "./components/NavBar.jsx";
// import Pics from "./components/Pics.jsx";
// import Carouse from "./components/Carouse.jsx";
// import Top from "./components/Top.jsx";
// import Top2 from "./components/Top2.jsx";
// import Top3 from "./components/Top3.jsx";
// import Login from "./components/Login.jsx";
// import Register from "./components/Register.jsx";
// import ProductsPage from "./components/ProductsPage.jsx";
// import ProductItem from "./components/ProductItem.jsx";
// import AdminDashboard from "./components/AdminDashboard.jsx";

// function App() {
//   return (
//     <Router>
//       <Routes>
      
//         <Route
//           path="/"
//           element={
//             <>
//               <NavBar />
//               <Pics />
//               <Carouse />
//               <Top />
//               <Top2 />
//               <Top3 />
//             </>
//           }
//         />
//         <Route
//           path="/products/:id" element={<> <NavBar /><ProductsPage /></> }/>
//         <Route
//           path="/login" element={<><NavBar /><Login /></>}/>
//         <Route
//           path="/register" element={<> <NavBar /> <Register /></>}/>
//         <Route
//           path="/productitem" element={<> <NavBar /> <ProductItem /> </> }/>

        
//         <Route path="/admindashboard" element={<AdminDashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/NavBar.jsx";
import Pics from "./components/Pics.jsx";
import Carouse from "./components/Carouse.jsx";
import Top from "./components/Top.jsx";
import Top2 from "./components/Top2.jsx";
import Top3 from "./components/Top3.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import ProductsPage from "./components/ProductsPage.jsx";
import ProductItem from "./components/ProductItem.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";

function App() {
  return (
    <Router>
      <Routes>
       
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <Pics />
              <Carouse />
              <Top />
              <Top2 />
              <Top3 />
            </>
          }
        />
        <Route
          path="/products/:id"
          element={
            <>
              <NavBar />
              <ProductsPage />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <NavBar />
              <Login />
            </>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/productitem"
          element={
            <>
              <NavBar />
              <ProductItem />
            </>
          }
        />

       
        <Route
          path="/adminDashboard"
          element={
            <AdminDashboard
              homeContent={
                <>
                  <Pics />
                  <Carouse />
                  <Top />
                  <Top2 />
                  <Top3 />
                </>
              }
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
