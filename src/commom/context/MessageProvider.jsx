import React, { useState } from 'react'
import { Alert, Button } from 'react-bootstrap';

export const MessageContext = React.createContext();
MessageContext.displayName = 'messageContext';
const initialMessage = {
    show:false, 
    message:'sucesso',
    type:'sucess'
}

const Message = ({children,show,hide, variant}) => {
    return (
        <>
            {
                show && 
                <Alert 
                style={{position:'absolute', top:'100px', right:'100px'}} 
                variant={variant}>
                    {children} 
                    <span onClick={hide} style={{color:'white', marginLeft:10, cursor:'pointer'}}>X</span>
                </Alert>
            }        
        </>
    )    
}

const MessageProvider = ({children}) => {
    const [message, setMessage] = useState(initialMessage);

    const showMessage = (message = 'sucesso', type = 'success') => {
        setMessage({
          show: true,
          message: message,
          type: type
        });
        setTimeout(() => {
          hideMessage();
        },2000)
    }

    const hideMessage = () => {
        setMessage(setMessage(initialMessage));
    }

  return (
    <MessageContext.Provider value={{showMessage}}>
        {message && <Message show={message.show} hide={hideMessage} variant={message.type}>{message.message}</Message>}
        {children}
    </MessageContext.Provider>
  )
}

export default MessageProvider