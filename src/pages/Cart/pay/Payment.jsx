import React, { useContext, useEffect} from "react";
import { AuthContext } from "../../../commom/context/AuthProvider";
import { OrdersContext } from "../../../commom/context/OrdersProvider";
import { useNavigate } from "react-router-dom";
import {  
  Step,
  StepLabel,
  Stepper,  
} from "@mui/material";
import styled from '@emotion/styled';

import Address from "./steps/address/Address";
import Pay from "./steps/pay/Pay";
import BuyCompleted from "./steps/paymentSuccess/BuyCompleted";

const StepBox = styled.div`
  & .Mui-active {
    fill: orange;
  } 

  & .Mui-completed {
    fill: green;
  } 
`

const Payment = () => {
  const navigate = useNavigate();
  const {  user, loadingUser } = useContext(AuthContext);
  const { wizardStep } =
    useContext(OrdersContext);

  useEffect(() => {
    if (!user && !loadingUser) {
      navigate("/login", { state: { redirect: "/cart/payment" } });
    }
  }, [user]);

  const components = [
    () => <Address />,
    () => <Pay />,
    () => <BuyCompleted />,
  ];

  return (    
    <div className="aov-page">
      <StepBox className="aov-content" style={{ paddingTop: 25 }}>
        <Stepper activeStep={wizardStep} style={{ marginBottom: 25 }}>
          <Step key={0}>
            <StepLabel>Endereço</StepLabel>
          </Step>
          <Step key={1}>
            <StepLabel>Pagamento</StepLabel>
          </Step>
          <Step completed={wizardStep == 2} key={2}>
            <StepLabel>Concluído</StepLabel>
          </Step>
        </Stepper>          
        {components[wizardStep]()}
      </StepBox>
    </div>   
  );
};

export default Payment;
