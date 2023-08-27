import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  updateEmail,
  updatePassword,
  updatePhoneNumber,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from "firebase/auth";

import { writeUserData } from "./FirebaseDatabaseService";
import app from "./FirebaseConfigApp";
import { CreateUser, updateUser } from "./UserFirestoreService";

const auth = getAuth(app);

const OnSingin = async ({ Email, Password, Username }) => {
  const credential = await createUserWithEmailAndPassword(
    auth,
    Email,
    Password
  );
  const user = credential.user;
  await updateProfile(user, { displayName: Username });
  await auth.currentUser.reload();

  //writeUserData(user.uid, user.displayName, user.email);
  sendEmailVerification(user, { url: "https://aovshop.netlify.app/" });
  addUserToFirestore(user);
  return user;
};

const OnLogin = async ({ Email, Password }) => {
  if (!Email || !Password) return null;
  const credential = await signInWithEmailAndPassword(auth, Email, Password);
  return credential.user;
};

const OnAuth = (setUser) => {
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
};

const OnSignOut = async () => {
  const credential = await signOut(auth);
};

const LoginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      addUserToFirestore(user);
     
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error);
      // ...
    });
};

// const LoginWithFacebook = () => {
//   const provider = new FacebookAuthProvider();
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       // The signed-in user info.
//       const user = result.user;

//       // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//       const credential = FacebookAuthProvider.credentialFromResult(result);
//       const accessToken = credential.accessToken;
//       console.log(result);
//       // IdP data available using getAdditionalUserInfo(result)
//       // ...
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.customData.email;
//       // The AuthCredential type that was used.
//       const credential = FacebookAuthProvider.credentialFromError(error);
//       console.log(error);
//       // ...
//     });
// };

const addUserToFirestore = (user) => {
  CreateUser(user.uid, {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
  });
};

const userUpdatePassword = (newPassword) => {  
  return new Promise((resolve, reject) => {
    const user = auth.currentUser; 
    updatePassword(user, newPassword).then(resolve).catch(reject);
  });
};

const userUpdateProfile = (name, photo) => {
  return new Promise((resolve, reject) => {
    let storagePhotoUrl = null;

    if (photo) {
      //storage photo
    }

    const photoURL = storagePhotoUrl ? storagePhotoUrl : auth.currentUser.photoURL;
    const displayName = name ? name : auth.currentUser.displayName;

    updateProfile(auth.currentUser, { displayName, photoURL })
      .then(resolve).catch(reject);
  });
};

const userDelete = () => {
  return new Promise((resolve, reject) => {
    const user = auth.currentUser;
    deleteUser(user).then(resolve).catch(reject);
  });
};

export {
  OnSingin,
  OnLogin,
  OnAuth,
  OnSignOut,
  LoginWithGoogle,  
  userUpdatePassword,
  userUpdateProfile,
  userDelete
};
