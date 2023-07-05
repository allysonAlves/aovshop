import { collection, getDocs, where, doc } from 'firebase/firestore';
import FirestoreService  from './FirebaseFirestoreService'
import { query } from 'firebase/database';

const firestoreService = new FirestoreService("products");

const getProduct = async (id) => {
  const result = await firestoreService.Get(id.toString());   
  return result;  
}

const searchProducts = async (query) =>{
    
    try{
        const keywords = query.split(" ");
        
        const result = await firestoreService.search('keywords','array-contains-any',keywords);
       
        return result;
    }catch(err)
    {
        return err;
    }
}

const searchProductsCategory = async (category, subCategory, brand) => {
    try{

        const result = await firestoreService.searchMulti(
            {path:'categoria',filter:'==', value: category },
            {path:'subCategoria',filter:'==', value: subCategory },
            {path:'marca',filter:'==', value: brand },            
            );
        
        return  result;
    }catch(err)
    {
        return err;
    }
} 



export { searchProducts, getProduct, searchProductsCategory}