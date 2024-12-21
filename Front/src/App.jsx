import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Carouse from './components/Carouse.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NavBar></NavBar>
    <Carouse></Carouse>
    
      
    
    </>
  )
}

export default App
