import { calcCart } from "../utils/utils";
import { updateUser } from "./UserFirestoreService";
import { v4 as uuidv4 } from 'uuid';

export const payWithUserCardService = (user, creditCard, order) => {

  return new Promise(async (resolve, reject) => {
   await waitSeconds(3);
   if(order.total > creditCard.value){
      return reject({message: 'limite insuficiente'});
   }   
   
   const logId = uuidv4();
   const log = {
      id:logId,       
      spent: order.total,
      date: Date.now(),
      orderId: order.id,
      paymentDetails: order.paymentDetails
   }  

   const paymentDetails = {
      ...order.paymentDetails,
      paymentId: logId,
      cardNumber: creditCard.number,
      paymentDate: log.date     
   }
   
   updateUser(user.uid, {
   card: { 
      ...creditCard, 
      value: creditCard.value - order.total,
      log:{[logId]:log}
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
