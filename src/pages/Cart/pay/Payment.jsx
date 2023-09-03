import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../../commom/context/CartProvider';
import { AuthContext } from '../../../commom/context/AuthProvider';
import { convertToBrPriceString, initialOrder } from '../../../utils/utils';
import { Button, Spinner } from 'react-bootstrap';
import { OrdersContext } from '../../../commom/context/OrdersProvider';
import { useNavigate } from 'react-router-dom';
import { Step, StepLabel, Stepper, ThemeProvider, createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Payment = () => {
    const navigate = useNavigate();
    const {creditCard,user, loadingUser} = useContext(AuthContext);
    const {cart,total} = useContext(CartContext);
    const {pay, isPaymentLoad, setOrderDetails, newOrder, isSuccessBuy} = useContext(OrdersContext);

    const [order, setOrder] = useState(initialOrder);
    const [step, setStep] = useState(0);    

  useEffect(() =>{
    if(!user && !loadingUser)
    {
      navigate('/login', {state: {redirect: '/cart/payment'}});
    }
  },[user]);

  useEffect(() => {
    if(isSuccessBuy){
      navigate('/account/orders')
    }
  },[isSuccessBuy])
    

  return (
    <ThemeProvider theme={darkTheme}>
      <div className='aov-page'>
        <div className='aov-content' style={{paddingTop:25}}>
          <Stepper activeStep={step} style={{marginBottom:25}}>
            <Step key={1} >
              <StepLabel color={red[200]}>Endereço</StepLabel>
            </Step>
            <Step key={2}>
              <StepLabel>Pagamento</StepLabel>
            </Step>
            <Step key={3}>
              <StepLabel>Finalizar</StepLabel>
            </Step>
          </Stepper>         
        
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Payment