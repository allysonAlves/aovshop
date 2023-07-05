import React,{useEffect, useState} from 'react'
import { useOutletContext,useNavigate, Link} from 'react-router-dom'
import {Button , DropdownButton , Dropdown, InputGroup, SplitButton , Form}from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {FaUser} from 'react-icons/fa'

import './Account.css'
import ModalConfirm from '../../components/Modal/ModalConfirm';
import { OnSignOut } from '../../Services/FirebaseAuthService';
import ProfileLoader from './components/ProfileLoader';
import ProfileComp from './components/ProfileComp';
const Account = () => {

  const {user} = useOutletContext();
  const navigate = useNavigate();
  const [showPopUp, setShowPopUp] = useState();
  const [load, setLoad] = useState(true);
  

  useEffect(() => {
    setTimeout(() => {
      setLoad(!user ? true : false)
    },500)
   
    if(!user)
    {
      navigate('/login');      
    }
  },[user])

  return (
    
    <div className='account-page bg-aov-dark-0'>
      <div className='page-limit'>

        <ProfileComp isLoading={load} user={user}/>
      
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