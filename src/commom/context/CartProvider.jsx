import React, { useCallback, useEffect, useState } from 'react'
import { OnAuth } from '../../Services/FirebaseAuthService';

export const CartContext = React.createContext();

const CartProvider = ({children}) => {     
  const [cart , setCart] = useState({});

  useEffect(() => {
    if(window.sessionStorage.getItem('cart')){
      setCart(JSON.parse(window.sessionStorage.getItem('cart')));
    }
  },[]);

  const saveSession = (sessionCart) => {
    window.sessionStorage.setItem('cart',JSON.stringify(sessionCart));    
  }

  const addProduct = (product) => {   

    let amountInCart = cart[product.id]? cart[product.id].amount + 1 : 1;
    let productToCart = {...product, amount: amountInCart};

    const newCart = {...cart, [product.id]: productToCart };

    setCart(newCart);

    saveSession(newCart);          
  }

  const removeProduct = (id) => {

    let newCart = {};

    if(cart[id]?.amount <= 1)
    {     
      Object.keys(cart).forEach(key => {
        if(key != id){
          newCart[key] = cart[key];          
        } 
      })    
      setCart(newCart);      
    }else{
      let newProduct = {...cart[id], amount: cart[id].amount - 1};      
      newCart = {...cart, [id]: newProduct};     
      setCart(newCart)
    }

    saveSession(newCart);
  }

  return (
    <CartContext.Provider value={{cart, addProduct, removeProduct}}>
        {children}
    </CartContext.Provider>
  )  
}

CartContext.displayName = 'cart';

export default CartProvider