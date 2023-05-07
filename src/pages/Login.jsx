import React from 'react'
import './login.css'

const Login = () => {

    function Login(e){
        e.preventDefault();
        const data = new FormData(e.target);
        console.log([...data.entries()][1][1]);
    }
  return (
    <div className='login-page'>
        <div className="login-limite">
            <form onSubmit={Login} className="form-login">
                <h1>acesse sua conta</h1>
                <input name='email' type="email" id="input-email" placeholder='Email*' required/>
                <input name='senha' type="password" id="input-senha" placeholder='Senha*' required/>
                <input type='submit' id='button-login' value="ACESSAR CONTA"/> 
                <div className='criar-recuperar'>
                    <span id="criar-conta">CRIAR CONTA</span>
                    <span id="recuperar-senha">ESQUECEU A SENHA?</span>
                </div>               
            </form>
            
        </div>
    </div>
  )
}

export default Login