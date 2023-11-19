import FirestoreService  from './FirebaseFirestoreService'


const firestoreService = new FirestoreService("orders");

export const getOrdersByUser = (userId) => {
   return firestoreService.search('userId', '==', userId);  
}

export const addOrder = (order) => {
    return firestoreService.Set(order.id,order);
}

