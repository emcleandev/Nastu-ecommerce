import React, { useContext, useState, createContext } from "react";
import { Context } from "urql";

export const ShopContext = createContext();

export const StateContext = ({ children }) => {
  const [qty, setQty] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const qtyToggle = (value) => {
    if (value === "increment") {
      setQty((prev) => prev + 1);
    } else {
      if (qty > 1) {
        setQty((prev) => prev - 1);
      }
    }
  };

  const onAdd = (product, quantity) => {
    // increase total quantity 
    setTotalQuantities((prev) => prev + quantity);

    //increase total totalPrice
    setTotalPrice((prev) => prev + product.price * quantity)

    const isItemInCart = cartItems.find((item) => item.slug === product.slug);
    if (isItemInCart) {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? {
                ...isItemInCart,
                quantity: isItemInCart.quantity + quantity,
              }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }
  };

  const removeItem = (product) => {

    setTotalPrice((prev) => prev - product.price * product.quantity)
    setTotalQuantities((prev) => prev - product.quantity)
    const newCartItems = cartItems.filter((item) => item.slug !== product.slug);
    setCartItems(newCartItems);
  };

  return (
    <ShopContext.Provider
      value={{
        qty,
        setQty,
        qtyToggle,
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        onAdd,
        removeItem,
        totalQuantities,
        totalPrice
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useStateContext = () => useContext(ShopContext);
