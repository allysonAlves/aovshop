import React,{useContext, useEffect, useState} from 'react'
import { useOutletContext,useNavigate, Link} from 'react-router-dom'
import {Button , DropdownButton , Dropdown, InputGroup, SplitButton , Form}from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {FaUser} from 'react-icons/fa'

import './Account.css'
import ModalConfirm from '../../components/Modal/ModalConfirm';
import { OnSignOut } from '../../Services/FirebaseAuthService';
import ProfileComp from './components/profileCard/ProfileComp';
import { AuthContext } from '../../commom/context/AuthProvider';
import CreditCard from './components/creditCard/CreditCard';
const Account = () => {

  //const {user} = useOutletContext();
  const {user, loadingUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPopUp, setShowPopUp] = useState();
  const [load, setLoad] = useState(true);
  

  useEffect(() => {   
    if(!user && !loadingUser)
    {
      navigate('/login');      
    }
  },[user])

  return (
    
    <div className='account-page bg-aov-dark-0'>
      <div className='page-limit'> 
        <div className='d-flex w-full justify-content-xl-evenly justify-content-lg-between flex-wrap'>
          <ProfileComp isLoading={loadingUser} user={user}/>
          <CreditCard isLoading={loadingUser} user={user}/>        
        </div>               

        <div className='account-data'>
        <h3>ENDEREÇOS</h3>
        <div className='data'>
          
        </div>
        </div>
      </div>

    </div>
    
  )
}

export default Account