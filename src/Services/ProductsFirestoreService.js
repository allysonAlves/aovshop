import FirestoreService  from './FirebaseFirestoreService'

const firestoreService = new FirestoreService("products");

const getProduct = async (id) => {
  const result = await firestoreService.Get(id.toString());   
  return result;  
}

const searchProducts = async (query) =>{
    
    try{
        const keywords = query.split(" ");
        
        const result = await firestoreService.search('keywords','array-contains-any',keywords);
    
        return  result;
    }catch(err)
    {
        return err;
    }
}

export { searchProducts, getProduct }