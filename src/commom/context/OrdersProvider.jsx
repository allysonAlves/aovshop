import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { addOrder, getOrdersByUser } from "../../Services/OrdersFirestoreService";
import { v4 as newGuid } from "uuid";
import { payWithUserCardService } from "../../Services/PayService";
import { MessageContext } from "./MessageProvider";
import { getOrderId, orderStatusEnum } from "../../utils/utils";

export const OrdersContext = React.createContext();
OrdersContext.displayName = "orders";

const initialState = {
  id: '',
  userId: '',
  products: {},
  total: 0,
  dateCreate: '',
  paymentDetails: {},
  address: {},
  paymentStatus: orderStatusEnum.approve.id,
  deliveryStatus: '',  
};

const OrdersProvider = ({ children }) => {
  const { creditCard, user } = useContext(AuthContext);
  const { showMessage } = useContext(MessageContext);

  const [orderList, setOrderList] = useState({});
  const [orderLoading, setOrderLoading] = useState(false);

  const [newOrder, setNewOrder] = useState({...initialState});
  const [isSuccessBuy, setIsSuccessBuy ] = useState(false);
  const [isPaymentLoad, setIsPaymentLoad ] = useState(false);

  const [wizardStep, setWizardStep] = useState(0);

  const getOrderList = () => {
    setOrderLoading(true);
    getOrdersByUser(user?.uid).then(response => {
      setOrderList(response);
    }).catch(error => {
      showMessage(error.message,'danger');
    }).finally(() => {
      setOrderLoading(false);
    })

  }

  const setStep = (step) => {
    setWizardStep(step);
  }

  const clearOrder = () => {
    setNewOrder({ ...initialState });
  }
  
  const setOrderDetails = (order) => {
    setNewOrder((oldOrder) => {
      return {
        ...oldOrder,
        ...order,
        id: newOrder.id ? newOrder.id : getOrderId(user.uid),
        userId: user?.uid,
        
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
    const cartToOrder = Object.values(cart).map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      amount: item.amount,
      image: item.images[0],
      sale: item.sale      
    }));  

    const currentOrder = {
      ...newOrder,
      userId: user.uid,
      products: cartToOrder,
      total: total,
      paymentDetails:{parcelas:1},
      dateCreate: Date.now(),
    };
    
    if (!validateOrder())
    {
      return showMessage("preencha todos os dados", "danger");
    }
         
    setIsPaymentLoad(true);

    payWithUserCardService(user, creditCard, currentOrder)
    .then(res => {              
      addOrder(res)
      .then(() => {       
        setNewOrder({...res});        
        showMessage("Compra realizada com sucesso!");
        setIsSuccessBuy(true);
      })     
    })
    .catch(error => {
      showMessage(error.message, "danger");
    })
    .finally(() => {
      setIsPaymentLoad(false);
    })     
  };

  return (
    <OrdersContext.Provider 
    value={{ 
      isPaymentLoad ,
      orderLoading,
      isSuccessBuy, 
      wizardStep,
      orderList,
      newOrder, 
      pay, 
      setStep,
      clearOrder,
      getOrderList, 
      setOrderDetails,
    }}>
      {children}
    </OrdersContext.Provider>
  );
};

export default OrdersProvider;
