import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../../commom/context/AuthProvider';
import { Box, Card, CardHeader, Paper, Radio, TextField } from '@mui/material';
import styled from '@emotion/styled';

const AddressContainer = styled.div`
    max-width: 100%;
    display: flex;
    justify-content: center;  
    margin-top: 40px;
`
const FormLimit = styled.div`
    flex: 1;
    max-width: 800px;
    display: flex;
    justify-content: center;    
`


const Address = () => {
    const { address } = useContext(AuthContext);
    const [selectedAddress, setSelectedAddress] = useState('');    
    const [selected , setSelected] = useState(-1);

    const handleChange = (event) =>{
        setSelected(event.target.value);
    }  

  return (
    <AddressContainer>
        <FormLimit key={1}>
            {
                Object.values(address).map((item) => (
                <div key={item.id} style={{cursor:'pointer'}} onClick={() => setSelectedAddress(item.id)}>
                    <Card
                    elevation={5} 
                    sx={{
                        width:350, 
                        padding:2, 
                        position:'relative'
                    }}                
                    > 
                        <Radio
                        sx={{position:'absolute',top:0,right:0}}
                        checked={selectedAddress === item.id}
                        onChange={ev => setSelectedAddress(item.id)}
                        value={item.id}
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'address' }}
                        />                   
                        <div>
                            {item.name}                                   
                        </div>
                        <div style={{fontSize:12}}>
                            {item.destinatario}                                   
                        </div>
                        <div style={{fontSize:12}}>
                            {item.rua}, {item.numero} - {item.cidade} - {item.estado}                                   
                        </div>
                        <div style={{fontSize:12}}>
                            {item.complemento}                                   
                        </div>
                        <div style={{fontSize:12}}>
                            {item.referencia}                                   
                        </div>
                    </Card>
                </div>
                ))
            }
        </FormLimit>
    </AddressContainer>
  )
}
//{"cep":"21854150","state":"RJ","city":"Rio de Janeiro","neighborhood":"Bangu","street":"Rua Amsterdam","service":"correios"}

export default Address