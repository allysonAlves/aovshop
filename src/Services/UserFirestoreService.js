import moment from 'moment';
import FirestoreService  from './FirebaseFirestoreService';
import { v4 as uuidv4 } from 'uuid';

const firestoreService = new FirestoreService("users");

const CreateUser = async (user) =>{
    debugger
    const validate =  moment().add(5,'years').valueOf();
    const cardNumber = parseInt('1947' + Math.floor(1000000000000 * Math.random(0,10)));
    
    const userObject = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        card: {
            validate: validate,
            number: cardNumber,
            value: 45000
        },
        address: []
      };
   
    await firestoreService.Set(user.uid, userObject);
}

const getUser =  async (id) => {
  const user =  await firestoreService.Get(id);
  return user;
}

const updateUser = async (id, newValue) =>{
    return await firestoreService.Set(id, newValue);    
}

const updateAddress = (user, newAddressList) =>{   
   return firestoreService.Set(user.uid, {
        address: [...newAddressList]
    });
}

export const putAddress = (user, address) =>{ 
    console.log(user) 
    const newAddressList = [...user?.address];
    const oldAddress = newAddressList?.find(item => item.id == address.id);

    if(oldAddress)
    {
        newAddressList[newAddressList.indexOf(oldAddress)] = address;
    } else {
        address.id = uuidv4();
        newAddressList.push(address);
    }    
       
    return firestoreService.Set(user.uid, {
        address: newAddressList
    });   
 }

 export const deleteUser = (userId) => {
    return firestoreService.Delete(userId);
 }

const listenerUser = (id, callback) => {
    return firestoreService.ListenerData(id, callback);
}

export { getUser, CreateUser, updateUser, updateAddress,listenerUser}