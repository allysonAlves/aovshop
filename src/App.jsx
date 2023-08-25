import { useState, useEffect } from 'react'
import { Outlet, useLocation} from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer'
import StartInformation from './components/Modal/StartInformation'
import AuthProvider from './commom/context/AuthProvider'
import CartProvider from './commom/context/CartProvider'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {   
  //const [user, setUser] = useState({});  
  //const [cart, setCart] = useState({});
  const { pathname } = useLocation(); 

  // useEffect(() =>{
  //   //OnAuth(setUser);  

  //   if(window.sessionStorage.getItem('cart'))
  //   {
  //     setCart(JSON.parse(window.sessionStorage.getItem('cart')));      
  //   } 
    
  // },[])

  // useEffect(() => {
  //   if(Object.values(cart).length > 0)
  //   {
  //     window.sessionStorage.setItem('cart',JSON.stringify(cart));      
  //   }
  // },[cart])

  useEffect(() => {
    window.scrollTo(0,0);
  },[pathname])
  

  return (
    <div className="App">
      <AuthProvider>
        <StartInformation/>
        <CartProvider>
          <Navbar/>        
          <Outlet/> 
        </CartProvider>
        <Footer/> 
      </AuthProvider>      
    </div>
  )
}

export default App
