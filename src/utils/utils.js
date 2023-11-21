export const convertToBrPriceString = (price) =>{ 
   return price.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}

export function calculateDiscount(price, percentage) {
    let discountvalue = price * (percentage / 100);
    let priceWithDiscount = price - discountvalue;
    return priceWithDiscount;
  } 

export const convertToCardNumber = (cardNumber) => {
    return "**** **** **** " + cardNumber.toString().slice(-4);
}

export const getOrderId = (userId) => {
    const initial = userId.slice(0,2);    
    return `${initial}${Date.now()}`.toUpperCase();

}

export const orderStatusEnum = {
    analize:{
        id:0,
        name:'pagamento pendente',
        color: 'warning',        
    },
    approve: {
        id:1,
        name:'pagamento aprovado',
        color: 'success',
    },
    cancel: {
        id:2,
        name:'cancelado',
        color: 'danger',
    },
    paymentFail: {
        id:3,
        name:'falha no pagamento',
        color: 'danger',
    },
    entregue: {
        id:4,
        name:'pedido entregue',
        color: 'primary',
    }
}

export const calcCart = (cart) => {
    return Object.values(cart).reduce((acumulator,product) => {        
        return acumulator + (product.price * (1 - product.sale / 100)) * product.amount;       
    },0);    
}

export const calculateCreditTotal = (cart) => {
    return Object.values(cart).reduce((acumulator,product) => {        
        return acumulator + (product.price * product.amount);       
    },0);  
}

export const initialOrder = {
    id: null,
    userId: null,
    products: null,
    total: 0,
    dateCreate: null,
    paymentDetails: {},
    address: null,
    statusRegister: orderStatusEnum.approve.id,
    paymentDate: ''
  };