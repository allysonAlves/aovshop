import React, { useCallback, useContext, useEffect, useState } from 'react'
import { OnAuth, userUpdateProfile,userUpdatePassword } from '../../Services/FirebaseAuthService';
import { MessageContext } from './MessageProvider';
import { listenerUser, getUser, updateAddress, putAddress} from '../../Services/UserFirestoreService';


export const AuthContext = React.createContext();

const AuthProvider = ({children}) => {  
  const {showMessage} = useContext(MessageContext);
  const [auth , setAuth] = useState(null);
  const [user, setUser] = useState({address: {}, card: null});
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadSave, setLoadSave] = useState(false); 

  useEffect(() =>{   
    OnAuth(auth => {
      setAuth(auth);           
    });
  },[]);

  useEffect(() => {
    getUserData();
  },[auth])

  const getUserData = () => {
    if(auth){      
      setLoadingUser(true);
      getUser(auth.uid)
      .then(res =>{         
        setUser(res);          
      })
      .catch(error =>{
        showMessage('erro no login '+ error, 'danger');
        setLoadingUser(false);
      }).finally(() => {
        setLoadingUser(false); 
      });
    }
  }
 

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

  const saveAddress = async (address) => {   
    return putAddress(user, address).then(() => {
      getUserData();
      showMessage('Endereço salvo com sucesso'); 
    }).catch(error => {
      showMessage(error.message);  
    });
  }

  const removeAddress = async (removeAddress) => {
    const newAddressList = [...user.address].filter(item => item.id != removeAddress.id);

    return updateAddress(user, newAddressList).then(() => {
      getUserData();
      showMessage('Endereço removido com sucesso'); 
    }).catch(error => {
      showMessage(error.message);  
    });
  }

  return (
    <AuthContext.Provider 
    value={
      {
        user: auth, 
        creditCard: user.card,
        address: user.address,
        loadingUser,
        loadSave, 
        updateProfile,
        saveAddress,
        removeAddress
      }
    }>        
        {children}
    </AuthContext.Provider>
  )
  
}

AuthContext.displayName = "auth";

export default AuthProvider;