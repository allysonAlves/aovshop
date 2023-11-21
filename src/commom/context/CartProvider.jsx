import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { MessageContext } from "./MessageProvider";
import OrdersProvider from "./OrdersProvider";
import {
  calcCart,
  calculateCreditTotal,
  initialOrder,
} from "../../utils/utils";

export const CartContext = React.createContext();

const CartProvider = ({ children }) => {
  const { user, creditCard } = useContext(AuthContext);
  const { showMessage } = useContext(MessageContext);
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [order, setOrder] = useState(initialOrder);

  useEffect(() => {
    if (window.sessionStorage.getItem("cart")) {
      setCart(JSON.parse(window.sessionStorage.getItem("cart")));
    }
  }, []);

  useEffect(() => {
    setTotal(calcCart(cart));
    setTotalCredit(calculateCreditTotal(cart));
  }, [cart]);

  const saveSession = (sessionCart) => {
    window.sessionStorage.setItem("cart", JSON.stringify(sessionCart));
  };

  const addProduct = (product) => {
    let amountInCart = cart[product.id] ? cart[product.id].amount + 1 : 1;
    let productToCart = { ...product, amount: amountInCart };

    const newCart = { ...cart, [product.id]: productToCart };

    setCart(newCart);

    saveSession(newCart);
  };

  const removeProduct = (id) => {
    let newCart = {};

    if (cart[id]?.amount <= 1) {
      Object.keys(cart).forEach((key) => {
        if (key != id) {
          newCart[key] = cart[key];
        }
      });
      setCart(newCart);
    } else {
      let newProduct = { ...cart[id], amount: cart[id].amount - 1 };
      newCart = { ...cart, [id]: newProduct };
      setCart(newCart);
    }

    saveSession(newCart);
  };

  const clearCart = () => {
    setCart({});
  };

  return (
    <OrdersProvider>
      <CartContext.Provider
        value={{
          cart,
          total,
          totalCredit,
          addProduct,
          removeProduct,
          clearCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </OrdersProvider>
  );
};

CartContext.displayName = "cart";

export default CartProvider;
