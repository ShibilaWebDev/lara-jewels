import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const envUrl = import.meta.env.VITE_API_URL;

const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem('cart');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
  if (!isLoggedIn) {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }
}, [cartItems, isLoggedIn]);
  useEffect(() => {
  checkLogin();
}, []);

const checkLogin = async () => {
  try {
    const res = await axios.get(
      `${envUrl}/users/isLogin`,
      {
        withCredentials: true,
      }
    );

    setIsLoggedIn(res.data.isLogin);
  } catch (error) {
    setIsLoggedIn(false);
  }
};
const fetchCart = async () => {
  try {
    const res = await axios.get(
      `${envUrl}/cart`,
      {
        withCredentials: true,
      }
    );
    

    setCartItems(res.data.cart);
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  if (isLoggedIn) {
    fetchCart();
  }
}, [isLoggedIn]);
 const addToCart = async (product, quantity = 1) => {

  // Guest User → localStorage
  if (!isLoggedIn) {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item._id === product._id
      );

      if (existingItemIndex >= 0) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      }

      return [...prevItems, { ...product, quantity }];
    });

    return;
  }

  // Logged User → MongoDB
  try {
    await axios.post(
      `${envUrl}/cart/add`,
      {
        productId: product._id,
        quantity,
      },
      {
        withCredentials: true,
      }
    );

    fetchCart(); // reload cart from MongoDB
  } catch (error) {
    console.log(error);
  }
};

 const removeFromCart = async (productId) => {
  if (!isLoggedIn) {
    setCartItems(prevItems =>
      prevItems.filter(item => item._id !== productId)
    );
    return;
  }

  try {
    await axios.delete(
      `${envUrl}/cart/remove/${productId}`,
      {
        withCredentials: true,
      }
    );

    fetchCart();
  } catch (error) {
    console.log(error);
  }
};

 const updateQuantity = async (productId, quantity) => {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  if (!isLoggedIn) {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === productId
          ? { ...item, quantity }
          : item
      )
    );
    return;
  }

  try {
    await axios.put(
      `${envUrl}/cart/update`,
      {
        productId,
        quantity,
      },
      {
        withCredentials: true,
      }
    );

    fetchCart();
  } catch (error) {
    console.log(error);
  }
};

 const clearCart = async () => {
  if (!isLoggedIn) {
    setCartItems([]);
    localStorage.removeItem("cart");
    return;
  }

  try {
    for (const item of cartItems) {
      if (!item.productId) continue;

      await axios.delete(
        `${envUrl}/cart/remove/${item.productId._id}`,
        {
          withCredentials: true,
        }
      );
    }

    fetchCart();
  } catch (error) {
    console.log(error);
  }
};

  const cartTotal = cartItems.reduce(
  (total, item) =>
    total + ((item.productId?.price || item.price) * item.quantity),
  0
);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
   <CartContext.Provider value={{
  cartItems,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  cartTotal,
  cartCount,
  isLoggedIn,
  checkLogin
}}>
      {children}
    </CartContext.Provider>
  );
};
