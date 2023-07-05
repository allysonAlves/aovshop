import React from 'react'
import {Button , ButtonGroup , Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { OnSignOut } from '../../Services/FirebaseAuthService';
import ModalConfirm from '../Modal/ModalConfirm';



const ButtonMyAccount = ({user}) => {
    const navigate = useNavigate();
  return (
    <Dropdown as={ButtonGroup} size='sm'>
        {user ?
            <>
                <Button onClick={() => navigate('/account')} variant="dark"><span style={{color:'orange'}}>Olá,</span> {user.displayName}</Button>
                <Dropdown.Toggle split variant="dark" id="dropdown-split-basic" />

                <Dropdown.Menu>
                    <Dropdown.Item href="/account">Minha Conta</Dropdown.Item>
                    <Dropdown.Item href="/account/orders">Meus Pedidos</Dropdown.Item>
                    <Dropdown.Divider />
                    <ModalConfirm mode='danger' title='Sair da Conta' message='confirme para sair!' onAccept={OnSignOut}>
                        <Dropdown.Item>Sair</Dropdown.Item>
                    </ModalConfirm>
                </Dropdown.Menu>        
            </>
            :
            <Button onClick={() => navigate('/login')} variant="dark">ACESSAR CONTA</Button>
        
        }
    </Dropdown>
  )
}

export default ButtonMyAccount