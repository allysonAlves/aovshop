import { useState, useEffect } from 'react'
import { Outlet, useLocation} from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer'
import StartInformation from './components/Modal/StartInformation'
import AuthProvider from './commom/context/AuthProvider'
import CartProvider from './commom/context/CartProvider'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MessageProvider from './commom/context/MessageProvider'
import { ThemeProvider, createTheme } from '@mui/material'

const darkTheme = createTheme({
  palette: {
    mode: "dark",   
  },
});

function App() {  
  
  const { pathname } = useLocation(); 

  useEffect(() => {
    window.scrollTo(0,0);
  },[pathname])
  

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <StartInformation/> 
        <MessageProvider>
          <AuthProvider>
              <CartProvider>
                <Navbar/>        
                <Outlet/> 
              </CartProvider>
              <Footer/> 
          </AuthProvider>      
        </MessageProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
