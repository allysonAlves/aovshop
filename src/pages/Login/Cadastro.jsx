import React, { useState, useEffect } from 'react'
import { Link, useOutletContext, useNavigate } from 'react-router-dom';
import { OnSingin } from '../../Services/FirebaseAuthService.js'
import './Cadastro.css'

const Cadastro = () => {

    const [password, setPassword] = useState(null);
    const navigate = useNavigate();
    const context = useOutletContext();

    async function Cadastrar(e){
        e.preventDefault();
        const data = [...new FormData(e.target).entries()];

        let name = data[0][1];
        let lastName = data[1][1];
        let email = data[2][1];
       // let password = data[3][1];
        
        if(email && password){
            const credential = await OnSingin({"Email":email, "Password": password, "Username": name + " " + lastName});
            console.log(credential);
        }
    }

    useEffect(()=>{
        if(context)
        {
            navigate('/account');
        }

    },[context])

  return (
    <div className='cadastro-page'>
        <div className="cadastro-limite">
            <form onSubmit={Cadastrar} type="post" className="form-cadastro">
                <div style={{width:"100%", textAlign:"center"}}>
                    <h1>Crie sua conta</h1>
                </div>   

                <input name='firstname' type="text" id="input-name" placeholder='Nome*' required/>
                <input name='lastname' type="text" id="input-sobrenome" placeholder='Sobrenome*' required/>
                <input name='email' type="email" placeholder='Email*' required/>
                <input name='senha' type="password" placeholder='Senha*' onChange={(e) => setPassword(e.target.value)} required minLength={6}/>
                <input name='repetirsenha' type="password" placeholder='Repetir senha*' minLength={6} required title='senhas não correspondem' pattern={password}/>
                <input type='submit' id='button-cadastrar' value="CADASTRAR"/> 
                <div className='criar-recuperar'>
                    <Link to="/login" className="voltar-login">ACESSAR UMA CONTA</Link>                    
                </div>               
            </form>
            
        </div>
    </div>
  )
}

export default Cadastro