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
    },1000)
   
    if(!user)
    {
      navigate('/login');      
    }
  },[user])

  return (
    
    <div className='account-page bg-aov-dark-0'>
      <div className='page-limit'>

        <ProfileComp isLoading={load} user={user}/>
      {/* {
        load ?
          <div className='account-data'>
            <div className='div-imagem'>
              {user?.photoURL ?            
                <img src={user?.photoURL}/> :
                <FaUser/>
              }
            </div>
            <div style={{display:"flex",alignItems:"center"}}>
              <div>MEUS DADOS</div>
              
              <DropdownButton id="dropdown-item-button" title="Minha Conta" variant="dark">              
                <Dropdown.Item as="button" onClick={() => console.log("action")}>Editar</Dropdown.Item>
                <Dropdown.Item as="button">Trocar Senha</Dropdown.Item>

                <ModalConfirm 
                btnOpenText='Sair' 
                title='Sair da Conta' 
                message='confirme para sair!' 
                mode='danger' 
                onAccept={() => OnSignOut()}>
                  <Dropdown.Item as="button">Sair</Dropdown.Item>
                </ModalConfirm>
                
              </DropdownButton>
              
            
            </div>
            <div className='data'>
              <p> {user?.displayName} </p>
              <p> {user?.email}</p>
              <p>

                <span style={{color:'#888'}}>
                  Verificação de email:  
                </span>

                {user.emailVerified ? 
                    <span style={{color:'green'}}>             
                    {' Confirmado'}
                    </span> :
                    <span>
                      <span style={{color:'red'}}>
                      {` PENDENTE `} 
                      </span>
                      <span className='btn-send-email-validade'>
                        enviar link de verificação 
                      </span>
                    </span>
                }

              </p>
                
            </div>
            
            <form onSubmit={(e) =>{e.preventDefault(); console.log(e.target[0].value)}}>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="pesquise o seu produto"
                  aria-label="Buscar produto"
                  aria-describedby="basic-addon2"                
                />
                <Button type='submit' variant="outline-secondary" id="button-addon2">
                  Button
                </Button>
              </InputGroup>            
            </form>    
          </div>
        :
        <ProfileLoader/>
      } */}


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