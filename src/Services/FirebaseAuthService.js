
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile , onAuthStateChanged , signOut, sendEmailVerification } from 'firebase/auth'
import { writeUserData , getUser} from './FirebaseDatabaseService'
import app from './FirebaseConfigApp'
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
//   appId: import.meta.env.VITE_FIREBASE_APPID
// };

// const app = initializeApp(firebaseConfig);



const auth = getAuth(app);

const OnSingin = async ({Email,Password,Username}) => {
  const credential = await createUserWithEmailAndPassword(auth, Email, Password);
  const user = credential.user;
  await updateProfile( user ,{ displayName: Username });   
  await auth.currentUser.reload();

  writeUserData(user.uid, user.displayName, user.email);
  sendEmailVerification(user, {url:'https://aovshop.netlify.app/'}); 
  
  return user;
}

const OnLogin = async ({Email,Password}) =>{
  if(!Email || !Password) return null;
  const credential = await signInWithEmailAndPassword(auth, Email, Password);
  
  return credential.user;
}

const OnAuth = (setUser) =>
{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user 
          
      setUser(user);
      // ...
    } else {
      // User is signed out
      setUser(null);
      // ...
    }
  });
}

const OnSignOut = async () =>{
  const credential = await signOut(auth);
}


export {OnSingin , OnLogin, OnAuth, OnSignOut};