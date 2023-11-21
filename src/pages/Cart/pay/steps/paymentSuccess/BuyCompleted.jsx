import React from 'react'
import { useContext } from 'react';
import { OrdersContext } from '../../../../../commom/context/OrdersProvider';
import styled from '@emotion/styled';
import { GiCheckMark } from "react-icons/gi";
import { Button } from '@mui/material';
import { CartContext } from '../../../../../commom/context/CartProvider';
import { useEffect } from 'react';

const BuyCompletedContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap; 
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 15px;

  & .order_number {
    margin-top: 20px;
  }

  & button{
    margin-top: 10px;
  }
`

const BuyCompleted = () => {
    const { setOrderDetails, newOrder, setStep, pay, isPaymentLoad, isSuccessBuy } = useContext(OrdersContext);
    const { clearCart } = useContext(CartContext);

    useEffect(() => {
      return () => {
        if(isSuccessBuy)
         clearCart();
      }
    }, [])
    
  return (
    <BuyCompletedContainer>
      <GiCheckMark fontSize={60} color='green'/>
      <div className='order_number'>
        Nº DO PEDIDO: 21578964
      </div>
      <div>
        PEDIDO REALIZADO COM SUCESSO!
      </div>
      <Button variant='outlined'>
        Acompanhar pedido
      </Button>
    </BuyCompletedContainer>
  )
}

export default BuyCompleted