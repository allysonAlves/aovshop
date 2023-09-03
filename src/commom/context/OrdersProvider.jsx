import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { addOrder } from "../../Services/OrdersFirestoreService";
import { v4 as newGuid } from "uuid";
import { payWithUserCardService } from "../../Services/PayService";
import { MessageContext } from "./MessageProvider";
import { orderStatusEnum } from "../../utils/utils";

export const OrdersContext = React.createContext();
OrdersContext.displayName = "orders";

const initialState = {
  id: null,
  userId: null,
  products: null,
  total: 0,
  dateCreate: null,
  paymentDetails: {},
  address: null,
  statusRegister: orderStatusEnum.approve.id
};

const OrdersProvider = ({ children }) => {
  const { creditCard, user } = useContext(AuthContext);
  const {showMessage} = useContext(MessageContext);

  const [orders, setOrders] = useState();
  const [newOrder, setNewOrder] = useState(initialState);
  const [isSuccessBuy, setIsSuccessBuy ] = useState(false);
  const [isPaymentLoad, setIsPaymentLoad ] = useState(false);
  
  const setOrderDetails = (order) => {
    setNewOrder((oldOrder) => {
      return {
        ...oldOrder,
        ...order,
        id: newOrder.id ? newOrder.id : newGuid(),
        userId: user.uid,
      };
    });
  };

  const validateOrder = () => { 
    let isValid = false
    if (newOrder.id && newOrder.products && newOrder.address) {
      isValid = true;
    }
    return isValid;
  };

  const pay = async (cart,total) => {

    setOrderDetails({
      userId: user.uid,
      products: cart,
      total: total,
      paymentDetails:{parcelas:1},
      dateCreate: Date.now(),
    });

    if (!validateOrder())
    {
      return showMessage("preencha todos os dados", "danger");
    }

    try{     
      setIsPaymentLoad(true);
      payWithUserCardService(user, creditCard, newOrder)
      .then(res => {              
        addOrder(res).then(() => {          
          showMessage("Compra realizada com sucesso!");
          setIsSuccessBuy(true);
        })     
      }).finally(() => {
        setIsPaymentLoad(false);
      })
      
    }catch(error){
      return showMessage("erro no pedido " + error, "danger");
    }
    
  };

  return (
    <OrdersContext.Provider value={{ orders,newOrder, setOrderDetails, pay, isPaymentLoad ,isSuccessBuy }}>
      {children}
    </OrdersContext.Provider>
  );
};

export default OrdersProvider;
