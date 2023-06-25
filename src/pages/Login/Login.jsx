import React, {useEffect} from 'react'
import { Link, useOutletContext, useNavigate } from 'react-router-dom';
import { OnLogin } from '../../Services/FirebaseAuthService.js'
import './login.css'

const Login = () => {
    const {user} = useOutletContext();
    const navigate = useNavigate();

    useEffect(() =>{
        if(user){
            navigate('/account');
        }
    },[user])

    
    async function Login(e){
        e.preventDefault();
        const data = [...new FormData(e.target).entries()];
        let email = data[0][1];
        let password = data[1][1];        
               
        if(email && password){
            const credential = await OnLogin({"Email":email, "Password": password});
            
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