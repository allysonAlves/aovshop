import { calcCart } from "../utils/utils";
import { updateUser } from "./UserFirestoreService";
import { v4 as uuidv4 } from 'uuid';

export const payWithUserCardService = (user, creditCard, order) => {

  return new Promise(async (resolve, reject) => {   
   if(order.total > creditCard.value){
      return reject({message: 'limite insuficiente'});
   }  

   const log = {
      id:uuidv4(),       
      spent: order.total,
      date: Date.now(),
      orderId: order.id,
      paymentDetails: order.paymentDetails
   }  

   const paymentDetails = {
      ...order.paymentDetails,
      paymentId: log.id,
      cardNumber: creditCard.number,
      paymentDate: log.date     
   }
   
   updateUser(user.uid, {
   card: { 
      ...creditCard, 
      value: creditCard.value - order.total,
      log:{[log.id]:log}
   },
   orders: {
         [order.id]: {id: order.id }
      }
   })
   .then(() => resolve({...order, paymentDetails: paymentDetails}))
   .catch((error) => reject(error));
  });
};

const waitSeconds = (seconds) => {
   return new Promise((resolve, reject) => {
      setTimeout(resolve,seconds*1000);
   })
}
