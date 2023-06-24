import app from './FirebaseConfigApp'
import { getDatabase, ref, set, child, get } from "firebase/database";

const db = getDatabase(app);

function writeUserData(userId, name, email) {    
    set(ref(db, 'users/' + userId), {
        personalData: {
            name: name,
            email:email
        }, 

    }).then(() => {
       
    })
      .catch((error) => {
       
    });
}

async function getUser(userId)
{
    try
    {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `users/${userId}`));
        return snapshot.val();

    }catch(error)
    {
        return error;
    }
    
}

export { writeUserData,getUser }