import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../commom/context/CartProvider";
import { AuthContext } from "../../../commom/context/AuthProvider";
import { initialOrder } from "../../../utils/utils";

import { OrdersContext } from "../../../commom/context/OrdersProvider";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Paper,
  Step,
  StepLabel,
  Stepper,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { red } from "@mui/material/colors";
import Address from "./steps/address/Address";
import Pay from "./steps/pay/Pay";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Payment = () => {
  const navigate = useNavigate();
  const { creditCard, user, loadingUser } = useContext(AuthContext);
  const { cart, total } = useContext(CartContext);
  const { pay, isPaymentLoad, setOrderDetails, newOrder, isSuccessBuy, wizardStep } =
    useContext(OrdersContext);

  useEffect(() => {
    if (!user && !loadingUser) {
      navigate("/login", { state: { redirect: "/cart/payment" } });
    }
  }, [user]);

  useEffect(() => {
    if (isSuccessBuy) {
      navigate("/account/orders");
    }
  }, [isSuccessBuy]);

  const components = [
    () => <Address />,
    () => <Pay />,
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="aov-page">
        <div className="aov-content" style={{ paddingTop: 25 }}>
          <Stepper activeStep={wizardStep} style={{ marginBottom: 25 }}>
            <Step key={1}>
              <StepLabel color={red[200]}>Endereço</StepLabel>
            </Step>
            <Step key={2}>
              <StepLabel>Pagamento</StepLabel>
            </Step>
            <Step key={3}>
              <StepLabel>Concluído</StepLabel>
            </Step>
          </Stepper>          
          {components[wizardStep]()}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Payment;
