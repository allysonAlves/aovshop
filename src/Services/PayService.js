import { calcCart } from "../utils/utils";
import { updateUser } from "./UserFirestoreService";
import { v4 as uuidv4 } from 'uuid';

export const payWithUserCardService = (user, creditCard, order) => {

  return new Promise(async (resolve, reject) => {   
   if(order.total > creditCard.value){
      return reject({message: 'limite insuficiente'});
   } 

   await waitSeconds(2);

   const paymentDetails = {
      ...order.paymentDetails,      
      cardNumber: creditCard.number,
      paymentDate: Date.now()     
   }   

   updateUser(user.uid, {
      card: { 
         ...creditCard, 
         value: creditCard.value - order.total,      
      },   
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
