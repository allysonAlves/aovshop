import { Dialog, DialogContent, TextField, Button } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import styled from "@emotion/styled";
import { AuthContext } from '../../../../../../commom/context/AuthProvider';

const MultiInputBox = styled.div`
    display: flex;
    width: 100%;
    gap: 10px;
    flex-wrap: wrap;    
`;

const initialAddress = {
    id: '',
    nome: '',
    destinatario: '',
    rua: '',
    bairro: '',
    cidade: '',    
    uf:'',
    cep: '',
    referencia:'',
}

const Form = ({open, address, onClose}) => {       
    const { user, saveAddress } = useContext(AuthContext);       

    const [newAddress, setNewAddress] = useState(initialAddress);
    const [formValid, setFormValid] = useState(false); 

    useEffect(() => {  
        setNewAddress(address || initialAddress);                 
    },[open]);   

    useEffect(() => {       
        setFormValid(
            newAddress.nome &&
            newAddress.destinatario &&
            newAddress.rua &&
            newAddress.bairro &&
            newAddress.cidade &&
            newAddress.uf &&
            /\d{8}/.test(newAddress.cep)    
        ); 
    },[newAddress]) 

    const handleChange = ({target:{id,value}}) => {
        setNewAddress(prev => ({
            ...prev,
            [id]: value
        }))
    }

    const handleSave = () => {  
        saveAddress(newAddress).then(() => {
            handleClose();                      
        });
    }

    const handleClose = () => {
        setNewAddress({...initialAddress});
        onClose();
    }    

  return (
    <Modal 
        show={open}
        onHide={handleClose}       
        size="md"
    >
        <Modal.Header>
            Cadastrar Endereço
        </Modal.Header>
        <Modal.Body className='mt-4'>
            <TextField            
            value={newAddress.nome}            
            onChange={handleChange}
            id='nome'
            required
            fullWidth
            placeholder='Casa / Trabalho'
            label='Identificador'
            InputLabelProps={{shrink:true}}/>  

            <TextField 
            onChange={handleChange}
            value={newAddress.destinatario}
            id='destinatario'
            required
            className='mt-3'
            fullWidth            
            label='Destinatário'/>  

            <TextField 
            value={newAddress.cep}
            onChange={handleChange}
            id='cep'
            name='zipcode'
            required
            fullWidth           
            label='CEP'
            className='mt-3'/> 
              
            <TextField 
            value={newAddress.rua}
            onChange={handleChange}
            id='rua'
            required
            fullWidth           
            label='Rua'
            className='mt-3'/>  

            <MultiInputBox>                
                <TextField 
                value={newAddress.numero}
                onChange={handleChange} 
                required  
                id='numero' 
                name='number'            
                className='mt-3 flex-grow-1'                
                label='Número'
                /> 
                <TextField 
                value={newAddress.bairro}
                onChange={handleChange}
                required
                id='bairro'
                name='neighborhood'
                className='mt-3 flex-grow-1'                
                label='Bairro'
                />                                 
            </MultiInputBox>

            <MultiInputBox>
                <TextField 
                value={newAddress.cidade}
                onChange={handleChange}
                required
                id='cidade'
                name='city'
                className='mt-3 flex-grow-1'                
                label='Cidade'
               /> 
                <TextField 
                value={newAddress.uf}
                onChange={handleChange} 
                required  
                id='uf' 
                name='state'            
                className='mt-3 flex-grow-1'                
                label='UF'
                /> 
            </MultiInputBox>

            <TextField 
            value={newAddress.referencia}
            onChange={handleChange}
            id='referencia'
            fullWidth           
            label='Complemento'
            className='mt-3'
            /> 

            <Button
            onClick={handleSave} 
            disabled={!formValid}
            color='inherit' 
            variant='contained' 
            fullWidth 
            size='large' 
            className='mt-4'>
                salvar
            </Button>
        </Modal.Body>
    </Modal>
  )
}

export default Form