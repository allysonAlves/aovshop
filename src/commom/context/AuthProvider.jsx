import React, { useCallback, useContext, useEffect, useState } from 'react'
import { OnAuth, userUpdateProfile,userUpdatePassword } from '../../Services/FirebaseAuthService';
import { MessageContext } from './MessageProvider';


export const AuthContext = React.createContext();

const AuthProvider = ({children}) => {  
  const {showMessage} = useContext(MessageContext);
  const [user , setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadSave, setLoadSave] = useState(false); 

  useEffect(() =>{   
    OnAuth(auth => {
      setUser(auth);
      setLoadingUser(false);
    });
  },[]);
 

  const updateProfile = (name, email, photo) => {    
    setLoadSave(true);  
    userUpdateProfile(name,photo).then(res => {
      showMessage('Perfil atualizado com sucesso'); 
    }).catch(error => {
      showMessage('Falha ao atualizar perfil', error.message);  
    }).finally(() =>{
      setLoadSave(false);
    });
  }

  return (
    <AuthContext.Provider value={{user, loadingUser,loadSave, updateProfile}}>        
        {children}
    </AuthContext.Provider>
  )
  
}

AuthContext.displayName = "auth";

export default AuthProvider;