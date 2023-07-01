import FirestoreService  from './FirebaseFirestoreService'

const firestoreService = new FirestoreService("users");

const CreateUser = async (userId, objectUser) =>{
    //const checkUser = await getUser(userId);
   
    await firestoreService.Set(userId, objectUser);
}

const getUser =  async (userId) => {
  const user =  await firestoreService.Get(userId);
  return user;
}

const updateUser = async (userId, newValue) =>{
    return await firestoreService.Set(userId, newValue);    
}

const updateAddress = async (userId, objectAddress) =>{
   return await firestoreService.Set(userId, {
        address: objectAddress
    });
}

export { getUser, CreateUser, updateUser, updateAddress}