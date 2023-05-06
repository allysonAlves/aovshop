import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import './App.css'

function App() { 
  const [showSidebar, setShowSidebar] = useState(false);

  const ShowSidebar = () => {
    setShowSidebar(true);
  };
  const HideSidebar = () =>
  {
    setShowSidebar(false);
  }

  return (
    <div className="App"> 
      {showSidebar && <Sidebar HideSidebar={HideSidebar}/> }         
      <Navbar ShowSidebar={ShowSidebar}/>           
      <Outlet/>      
      <Footer/>      
    </div>
  )
}

export default App
