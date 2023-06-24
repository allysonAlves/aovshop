import { useRef, useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import PopUpConfirmation from './components/PopUpConfirmation/PopUpConfirmation'

import { OnAuth, OnSignOut} from './Services/FirebaseAuthService.js'
import './App.css'

function App() { 
  const [showSidebar, setShowSidebar] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [user, setUser] = useState({});
  const [cart, updateCart] = useState({});

  const setCart = (value) => {
    updateCart(value);
    if(Object.values(value).length < 1){
      window.sessionStorage.removeItem('cart')
      return;
    }
    window.sessionStorage.setItem('cart',JSON.stringify(cart));

  }

  const ShowSidebar = () => {
    setShowSidebar(true);
  };
  const HideSidebar = () =>
  {
    setShowSidebar(false);
  }
  const signOut =() => {
    setShowPopUp(true);
  }

  const canSignOut = () => {
    OnSignOut();
    setShowPopUp(false);
  }

  useEffect(() =>{
    OnAuth(setUser);  

    if(window.sessionStorage.getItem('cart'))
    {
      updateCart(JSON.parse(window.sessionStorage.getItem('cart')));
      
    }  
  },[])

  useEffect(() => {
    if(Object.values(cart).length > 0)
    {
      window.sessionStorage.setItem('cart',JSON.stringify(cart));
    }
  },[cart])

  

  return (
    <div className="App">       

      {showSidebar && 
        <Sidebar user={user} 
        HideSidebar={HideSidebar}
        signOut={() => signOut()}
        /> 
      }
      
      <PopUpConfirmation 
        popUpTitle={'até breve'} 
        showPopUp={showPopUp} 
        OnConfirmed={function(){canSignOut()}} 
        OnCanceled={() => setShowPopUp(false)}        
        />

      <Navbar 
        ShowSidebar={ShowSidebar} 
        user={user}
        cart={cart} 
        signOut={() => signOut()} 
        />

      <Outlet context={{user,cart,setCart}} />            
      <Footer user={user}/>      
    </div>
  )
}

export default App
