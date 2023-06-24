import React,{useEffect, useState} from 'react'
import { useOutletContext,useNavigate, Link } from 'react-router-dom'

import './Account.css'
const Account = () => {

  const {user} = useOutletContext();
  const navigate = useNavigate();
  const [showPopUp, setShowPopUp] = useState();

  useEffect(() => {
    if(!user)
    {
      navigate('/login');
    }
  },[user])


  return (
    
    <div className='account-page'>
      <div className='page-limit'>
        {!user?.emailVerified ? <div className='email-confirmation'>Confirme seu email</div> : <div className='welcome'></div>}
        <div className='account-data'>
          <h3>MEUS DADOS</h3>
          <div className='data'>
            <p> {user?.displayName} </p>
            <p> {user?.email}</p>
            <p>

              <span style={{color:'#888'}}>
                Verificação de email:  
              </span>

              {user?.emailVerified ? 
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
          <div className='btns-data'>
            <button id='edit-btn'>
              EDITAR
            </button>
            <button style={{backgroundColor:'darkgreen'}}>
              MUDAR SENHA
            </button>
            <button style={{backgroundColor:'#555'}}>
              EXCLUIR MINHA CONTA
            </button>
          </div>
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