import { useRef, useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Outlet, useLocation} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer'


import { OnAuth, OnSignOut} from './Services/FirebaseAuthService.js'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import StartInformation from './components/Modal/StartInformation'

function App() {   
  const [user, setUser] = useState({});
  const [cart, setCart] = useState({});
  const { pathname } = useLocation();

 

  useEffect(() =>{
    OnAuth(setUser);  

    if(window.sessionStorage.getItem('cart'))
    {
      setCart(JSON.parse(window.sessionStorage.getItem('cart')));      
    } 
    
  },[])

  useEffect(() => {
    if(Object.values(cart).length > 0)
    {
      window.sessionStorage.setItem('cart',JSON.stringify(cart));      
    }
  },[cart])

  useEffect(() => {
    window.scrollTo(0,0);
  },[pathname])
  

  return (
    <div className="App">       
      <StartInformation/>

      <Navbar        
        user={user}
        cart={cart}         
        />
      <main>
        <Outlet context={{user,cart,setCart}} />
      </main>
      <Footer user={user}/>      
    </div>
  )
}

export default App
