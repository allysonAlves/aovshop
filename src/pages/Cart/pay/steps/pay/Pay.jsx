import React from 'react';
import styled from '@emotion/styled';
import { Card, CardContent, Typography, Button, Backdrop, CircularProgress } from '@mui/material';
import { CartContext } from '../../../../../commom/context/CartProvider';
import { useContext } from 'react';
import { convertToBrPriceString } from '../../../../../utils/utils';
import { OrdersContext } from '../../../../../commom/context/OrdersProvider';
import CreditCard from '../../../../account/components/creditCard/CreditCard';
import { useEffect } from 'react';

const PayContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  align-items: center;
`

const ResumeBox = styled.div`
  padding: 3px;
  flex: 1;  
  min-width: 400px;
`
const PaymentBox = styled.div`
  padding: 3px;
  flex: 1;
  min-width: 400px;
`

const ItemDetail = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4px;
  width: 100%;
  color: #aeaeae;
  font-size: 10px;
`

const Pay = () => {
  const { newOrder, setStep, pay, isPaymentLoad, isSuccessBuy } = useContext(OrdersContext);
  const { cart, total } = useContext(CartContext);

  useEffect(() => {
    if(isSuccessBuy){
      setStep(2);
    } 
  }, [isSuccessBuy]) 
  
  const handlePay = () => {
    pay(cart, total);
  }

  function calculateDiscount(product) {
    let discountvalue = product.price * (product.sale / 100);
    let priceWithDiscount = product.price - discountvalue;
    return priceWithDiscount;
  } 

  return (
    <PayContainer>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isPaymentLoad}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <ResumeBox>
        <Card elevation={2} sx={{width:'100%', height:'60vh'}}>
          <CardContent sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>

            <Typography variant='h7'>
              Detalhes do pedido
            </Typography> 
            <Typography sx={{overflowY:'auto', marginTop:2}} component='div'>
              {
                Object.values(cart).map(product => (
                  <ItemDetail key={product.id} title={product.name}>                  
                    <Typography noWrap sx={{fontSize:12}}>{product.name}</Typography>
                    <Typography sx={{fontSize:12}}>{convertToBrPriceString(calculateDiscount(product))}</Typography>
                  </ItemDetail>
                ))              
              }
            </Typography>

            <Typography variant='h7' sx={{marginTop:5}}>
              Entrega
            </Typography> 
            <Typography sx={{flex:'1', overflowY:'auto', marginTop:2}} component='div'>
              {
                <>
                 <div>{newOrder.address?.nome}</div>         
                 <div className='mb-2'>
                    <Typography noWrap sx={{fontSize:12, color:'#aeaeae'}}>                      
                      {
                        `${newOrder.address?.rua} 
                        ${newOrder.address?.numero} - 
                        ${newOrder.address?.bairro} - 
                        ${newOrder.address?.cidade} - 
                        ${newOrder.address?.uf} - 
                        ${newOrder.address?.cep}`
                      }                     
                    </Typography>
                    <Typography noWrap sx={{fontSize:12, color:'#aeaeae'}}>
                      {newOrder.address?.referencia}
                    </Typography>
                 </div>
                 <Button 
                  size='small' 
                  variant='outlined'
                  onClick={() => {setStep(0)}}>
                    Alterar
                  </Button>         
                </>
              }
            </Typography>
            
            <Typography sx={{textAlign:'end'}} variant='h5' component='div'>
              Total: {convertToBrPriceString(total)}
            </Typography>
           
          </CardContent>
        </Card>
      </ResumeBox> 

      <PaymentBox>
        <Card elevation={5} sx={{width:'100%', height:'60vh'}}>
          <CardContent sx={{display:'flex', flexDirection:'column', justifyContent:'space-between', height:'100%'}}>
            <Typography variant="h7">Pagamento</Typography>
            <Typography component='div' variant='body2' sx={{display:'flex', justifyContent:'center'}}>
              <CreditCard/>
            </Typography>
            <Typography component='div' sx={{display:'flex', justifyContent:'end'}}>
              <Button 
              onClick={() => handlePay()}
              sx={{
                  backgroundColor:'darkgreen', 
                  color:'white', 
                  fontWeight:'bold'
                }} 
                variant='contained' 
                color='success'>
                  Finalizar pedido
                </Button>
            </Typography>
          </CardContent>
        </Card>
      </PaymentBox>          
    </PayContainer>
  )
}

export default Pay