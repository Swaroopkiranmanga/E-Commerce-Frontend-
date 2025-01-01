
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/NavBar.jsx'; 
import Pics from './components/Pics.jsx';
import Carouse from './components/Carouse.jsx';
import Top from './components/Top.jsx';
import Top2 from './components/Top2.jsx';
import Top3 from './components/Top3.jsx';
import Login from './components/Login.jsx'; 
import ProductsPage from './components/ProductsPage.jsx';
import Register from './components/Register.jsx';

function App() {
  return (
    <Router>
     
      <NavBar />


     
      <Routes>
      
        <Route
          path="/"
          element={
            <>
              <Pics />
              <Carouse />
              <Top />
              <Top2 />
              <Top3 />
            </>
          }
        />
        <Route path="/products/:id" element={<ProductsPage />} />
      
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

