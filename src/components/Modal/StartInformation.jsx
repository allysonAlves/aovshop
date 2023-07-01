import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function StartInformation() {
  const [show, setShow] = useState(false);
  const [dontShowInformation, setDontShowInformation] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dontShowAgain = () => {   
    if(dontShowInformation)
    {
        window.localStorage.setItem('dontShowInformation', 'true');
    
    }
  }

  useEffect(() => {
    if(window.localStorage.getItem('dontShowInformation'))
    {
        
    }else
    {
        handleShow();
    }

    
  },[])

  return (
    <> 
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>ATENÇÃO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ol style={{display:'flex', flexDirection: 'column', gap:15}}>
               <li>
                    Este site é apenas um projeto demonstrativo, não é possível comprar nenhum produto contido aqui.                
                </li> 
                <li>
                    todos os produtos e preços neste site são fictícios.
                </li>
                <li>
                    Este site não processa nem solicida nenhum dado de pagamento.
                </li>
                <li>
                    Os únicos dados solicidados pelo site são E-mail, Senha criada no site e utilizada no site para efetuar login.
                </li>
                <li>
                    É possível cadastrar endereço no site, como não se trata de um site para compras reais aconselhamos utilizar endereço fictício, apenas para verificar o funcionamento do site.
                </li>
                <li>
                    Todos os dados cadastrados no site são protegidos, armazenados no Firebase com regras de segurança onde cada usuário consegue ter acesso apenas aos seus própios dados cadastrados e estando logado.                    
                </li>
                <li>
                    Todo o sistema de login é processado e cadastrado pelo Firebase, o site só obtem acesso ao E-mail, id de usuário e foto do email, esta ultima apenas quando o login é realizado atráves do google.
                </li>
                <li>
                    Ao excluir sua conta todos seus dados são exluídos automaticamente e de maneira permanentemente, só sendo possivel acessar a conta de novo realizando um novo cadastro.
                </li>
                <li>
                    Para excluir sua conta e seus dados acesse:
                    <ul style={{display:'flex', justifyContent:'space-evenly', flexDirection:'column'}}>
                        <li>
                            Minha Conta
                        </li>
                        <li>
                            menu Minha Conta
                        </li>
                        <li>
                            Editar
                        </li>
                        <li>
                            Excluir Minha Conta.
                        </li>
                    </ul>
                </li>
                <li>
                    ou vá direto para <a style={{fontSize:17}} href='/account/edit'>https://aovshop.netlify.app/account/edit</a> e Clique em Excluir Minha Conta
                </li>
                <li>
                    Toda conta inicia com um cartão de crédito fictício no valor de R$ 15.000,00, o cartão é utilizada para simular compras no site.
                </li>
                <li>
                    Ao efetuar uma compra simulada no site a mesma será acrescentada a sua página de pedidos, e o valor do pedido descontado do cartão fictício.
                </li>
                <li>
                    Ao esgotar o limite do cartão fictício e tentar efetuar uma compra um aviso de limite excedido será mostrado e a compra não será aceita.
                </li>
                <li>
                    Este site foi desenvolvido por mim - Allyson Alves - como projeto de estudo, utilizando
                   <ul style={{display:'flex', justifyContent:'space-around' , flexDirection:'column'}}>
                        <li>
                            Javascript                        
                        </li> 
                        <li>
                            CSS
                        </li>
                        <li>
                            HTML
                        </li>
                        <li>
                            React
                        </li>
                        <li>
                            Bootstrap
                        </li>
                        <li>
                                Firebase
                            <ul style={{lineHeight:1.5}}>
                                <li>Autentication</li>
                                <li>Firestore</li>
                            </ul>
                        </li>
                   </ul>
                     
                </li>
            </ol>            
        </Modal.Body>
        <Modal.Footer>
            <form style={{width:'100%', display:'flex', justifyContent:'space-between', alignItems: 'center'}}>
                <Form.Check
                type='checkbox'
                id='default-checkbox'
                label='Não mostrar novamente'
                unselectable='as'
                checked={dontShowInformation}                
                onChange={e => setDontShowInformation(!dontShowInformation)}
                />         
                <Button onClick={() => {handleClose(); dontShowAgain();}} variant="primary">Entendi</Button>
            </form>
        </Modal.Footer>
      </Modal>
    </>
  );
}