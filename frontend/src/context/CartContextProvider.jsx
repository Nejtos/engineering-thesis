import { useEffect, useState } from "react";
import {items} from "../pages/order-panel/components/Data.jsx";
import { CartContext } from "./CartContex.jsx";

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < items + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

const getInitialState = () => {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : getDefaultCart();
};

export const CartContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getInitialState);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (itemID, amount) => {
    setCartItems((prev) => ({ ...prev, [itemID]: parseInt(amount) }));
  };

  const increaseItemValue = (itemID) => {
    setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] + 1 }));
  };

  const decreaseItemValue = (itemID) => {
    setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] - 1 }));
  };

  const removeFromCart = (itemID) => {
    setCartItems((prev) => ({ ...prev, [itemID]: 0 }));
  };

  const updateCartItemCounter = (itemID, newAmount) => {
    setCartItems((prev) => ({ ...prev, [itemID]: newAmount }));
  };

  const contextValue = {
    cartItems,
    addToCart,
    increaseItemValue,
    decreaseItemValue,
    removeFromCart,
    updateCartItemCounter,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};
