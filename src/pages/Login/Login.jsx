import React, {useContext, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc'
import { OnLogin, LoginWithGoogle } from '../../Services/FirebaseAuthService.js'

import { AuthContext } from '../../commom/context/AuthProvider.jsx';
import './login.css'

const Login = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const { state } = useLocation();


    useEffect(() => {
        if(user){
           navigate(state?.redirect ? state.redirect : '/account');
        }
    },[user]);
    
    function Login(e){
        e.preventDefault();
        const data = [...new FormData(e.target).entries()];
        let email = data[0][1];
        let password = data[1][1];        
               
        if(email && password){
            OnLogin({"Email":email, "Password": password});            
        }
    }


  return (
    <div className='login-page'>
        <div className="login-limite">
            <form onSubmit={Login} className="form-login">
                <div style={{width:"100%", textAlign:"center"}}>
                    <h1>Acesse sua conta</h1>
                </div>                 
                <input name='email' type="email" id="input-email" placeholder='Email*' required/>
                <input name='senha' type="password" id="input-senha" placeholder='Senha*' required/>
                <input type='submit' id='button-login' value="ACESSAR CONTA"/> 
                <div className='btns-logins'>
                    <button onClick={() => LoginWithGoogle()}>
                        <FcGoogle/>
                    </button>
                    {/* <button className='div-facebook' onClick={() => LoginWithFacebook()}>                        
                        <FaFacebookSquare className='facebook-icon'/>
                    </button> */}
                </div>
                <div className='criar-recuperar'>
                    <Link to="/singin" className="criar-conta">CRIAR CONTA</Link>
                    <span id="recuperar-senha">ESQUECEU A SENHA?</span>
                </div>               
            </form>
            
        </div>
    </div>
  )
}

export default Login