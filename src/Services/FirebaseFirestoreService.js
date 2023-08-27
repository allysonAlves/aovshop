import app from './FirebaseConfigApp'
import { getFirestore, collection , addDoc, doc, setDoc, updateDoc ,deleteDoc, onSnapshot , getDoc, getDocs , where, query, orderBy, limit} from 'firebase/firestore'

const firestore = getFirestore(app);

const FirebaseService = class {
    constructor(collection) {
      this.collection = collection;    
    }

    async Get(documentId)
    {
        
        const result = await getDoc(doc(firestore,this.collection,documentId))

        if(result.exists())
        {
            return result.data();
        }else
        {
            return null;
        }        
    }

    async Add(objectValue)
    {    
        try {
            const docRef = await addDoc(collection(firestore, this.collection), objectValue);
            
            return docRef;
        } catch (e) {            
            return null;
        }    
    }

    async Set(documentId, objectValue)
    {    
        try {
            const docRef = await setDoc(doc(firestore, this.collection, documentId), objectValue, { merge: true });
            
            return docRef;
        } catch (e) {            
            return null;
        }    
    }

    async Update(documentId, objectValue)
    {    
        try {
            const docRef = await updateDoc(doc(firestore, this.collection, documentId), objectValue);
           
            return docRef;
        } catch (e) {            
            return null;
        }    
    }
   
    async Delete(documentId)
    {
        await deleteDoc(doc(firestore, this.collection, documentId));
    }

    ListenerData(documentId, functionToGetNewData){
        onSnapshot(doc(firestore, this.collection, documentId), 
        { includeMetadataChanges: true },
        (doc) => {
            const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            //console.log(source, " data: ", doc.data());
            functionToGetNewData({data: doc.data(), status:source});
        });
    } 

    async search(fieldPath, whereOperator, value)
    {  
        try{
            const itemRef = collection(firestore, this.collection)
            const q = query(itemRef, where(fieldPath, whereOperator, value));
    
            const querySnapshot = await getDocs(q); 
            let docs = {}
    
            querySnapshot.forEach((doc) => {
                const docData = doc.data();
                docs[doc.id] = docData;
                
            });

            return docs;
        }catch(err)
        {            
            return err;
        }
    } 

    async searchMulti(query1 = {path: 'categoria', filter:'==',value}, query2, query3){
        try{
            const itemRef = collection(firestore, this.collection)
            let q = '';

            if(query3?.value){

                q = query(itemRef, where(query1?.path, query1?.filter, query1?.value) , where(query2.path, query2.filter, query2.value),  where(query3.path, query3.filter, query3.value));
                
            }else if(query2?.value)
            {
                q = query(itemRef, where(query1?.path, query1?.filter, query1?.value) , where(query2.path, query2.filter, query2.value));
               
            } else {
                
                q = query(itemRef, where(query1?.path, query1?.filter, query1?.value));
            }   
            
           
            const querySnapshot = await getDocs(q); 

            
            let docs = {}
    
            querySnapshot.forEach((doc) => {
                const docData = doc.data();
                docs[doc.id] = docData;

            });

            return docs;
        }catch(err)
        {
            return err;
        }
    }

}




export default FirebaseService ;