import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { CartContext } from "../context/CartContext";
import styles from "../Styles/Cart.module.css";
import { Trash2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  
  const { cartItems, updateQuantity, removeFromCart, cartTotal } =
    useContext(CartContext);
  const navigate = useNavigate();
  const envUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const items = cartItems;
 
  const total = cartTotal;
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.cartWrapper}>
        <h1 className={styles.title}>Your Shopping Cart</h1>

        {items.length === 0 ? (
          <div className={styles.emptyCart}>
            <p>Your cart is currently empty.</p>
            <button onClick={() => navigate("/collections")}>
              CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          <div className={styles.cartContent}>
            <div className={styles.itemsList}>
              {items.map((item) => {
                const product = item.productId || item;
                console.log("Cart Item:", item);
                console.log("Product:", product);

                const imageSrc = product.imageUrl?.length
                  ? product.imageUrl[0].startsWith("http")
                    ? product.imageUrl[0]
                    : `${envUrl}${product.imageUrl[0]}`
                  : "https://via.placeholder.com/150";

                return (
                  <div
                    key={item._id || product._id}
                    className={styles.cartItem}
                  >
                    <img
                      src={imageSrc}
                      alt={product.name}
                      className={styles.itemImage}
                      onError={(e) =>
                        (e.target.src = `http://localhost:3000/uploads/noImage.png`)
                      }
                    />

                    <div className={styles.itemDetails}>
                      <h3>{product.name}</h3>
                      <p className={styles.itemPrice}>₹ {product.price}</p>
                    </div>

                    <div className={styles.qtyControl}>
                      <button
                        onClick={() =>
                          updateQuantity(product._id, item.quantity - 1)
                        }
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity(product._id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <div className={styles.itemTotal}>
                      <p>₹ {product.price * item.quantity}</p>

                      <button
                        className={styles.removeBtn}
                        onClick={() => removeFromCart(product._id)}
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.cartSummary}>
              <h2>Order Summary</h2>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>₹ {total}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className={styles.summaryTotal}>
                <span>Total</span>
                <span>₹ {total}</span>
              </div>
              <button
                className={styles.checkoutBtn}
                onClick={() => navigate("/checkout")}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
