import FirestoreService  from './FirebaseFirestoreService'


const firestoreService = new FirestoreService("users");

const CreateUser = async (user) =>{
    
    const validate =  new Date().setFullYear(date.getFullYear() + 5);
    const cardNumber = parseInt('1947' + Math.floor(1000000000000 * Math.random(0,10)));
    
    const userObject = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        card: {
            validate: validate,
            number: cardNumber,
            value: 15000
        }
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

const updateAddress = async (userIdid, objectAddress) =>{
   return await firestoreService.Set(id, {
        address: objectAddress
    });
}

const listenerUser = (id, callback) => {
    return firestoreService.ListenerData(id, callback);
}

export { getUser, CreateUser, updateUser, updateAddress,listenerUser}