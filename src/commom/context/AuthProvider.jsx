import React, { useCallback, useEffect, useState } from 'react'
import { OnAuth } from '../../Services/FirebaseAuthService';


export const AuthContext = React.createContext();

const AuthProvider = ({children}) => {     
  const [user , setUser] = useState();

  useEffect(() =>{   
        OnAuth(setUser);
  },[]);

  return (
    <AuthContext.Provider value={{user}}>
        {children}
    </AuthContext.Provider>
  )
  
}

AuthContext.displayName = "auth";

export default AuthProvider;