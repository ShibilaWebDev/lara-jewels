import React, { useContext, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { CartContext } from '../context/CartContext';
import styles from '../Styles/Checkout.module.css';

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);
  const [showPayment, setShowPayment] = useState(false);
  const navigate = useNavigate();
  const envUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', address: '', city: '', zip: '', country: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const totalAmount = cartItems.reduce(
  (total, item) =>
    total +
    ((item.productId?.price || item.price || 0) *
      item.quantity),
  0
);
const handlePayment = () => {
  const options = {
    key: "rzp_test_xxxxxxxxx", // Razorpay Test Key
    amount: totalAmount * 100,
    currency: "INR",
    name: "Alisha Jewels",
    description: "Order Payment",

    handler: async function (response) {
      console.log(response);

      // After successful payment create order
      await handleCheckout(new Event("submit"));
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
}
  const handleCheckout = async (e) => {
  e.preventDefault();

  try {
    console.log("Cart Items:", cartItems);
    await axios.post(`${envUrl}/orders/create`, {
  customerName:
    formData.firstName + " " + formData.lastName,

  email: formData.email,

  address: formData.address,

  city: formData.city,

  zip: formData.zip,

  country: formData.country,

products: cartItems.map(item => ({
  name: item.productId?.name || item.name,
  price: item.productId?.price || item.price,
  quantity: item.quantity,
})),

  totalAmount: totalAmount,

  paymentMethod: "COD",
});

    alert("Order placed successfully!");

    clearCart();

    navigate("/");
  } catch (error) {
    console.log(error);

    alert("Order failed");
  }
};

  if (cartItems.length === 0) {
    return (
      <div className={styles.container}>
        <Navbar />
        <div className={styles.emptyCheckout}>
          <h2>Your cart is empty</h2>
          <button onClick={() => navigate('/collections')}>Return to Shop</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.checkoutWrapper}>
        <div className={styles.formSection}>
          <h2>Shipping Information</h2>
          <form onSubmit={handleCheckout} className={styles.form}>
            <div className={styles.row}>
              <input required type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
              <input required type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
            </div>
            <input required type="email" name="email" placeholder="Email Address" onChange={handleChange} />
            <input required type="text" name="address" placeholder="Address" onChange={handleChange} />
            <div className={styles.row}>
              <input required type="text" name="city" placeholder="City" onChange={handleChange} />
              <input required type="text" name="zip" placeholder="ZIP / Postal Code" onChange={handleChange} />
            </div>
            <input required type="text" name="country" placeholder="Country" onChange={handleChange} />
            
            <h2>Payment Method</h2>
            <div className={styles.paymentMethods}>
              <label><input type="radio" name="payment" value="card" defaultChecked /> Credit / Debit Card</label>
              <label><input type="radio" name="payment" value="cod" /> Cash on Delivery</label>
            </div>
            
          <button
  type="button"
  onClick={handlePayment}
  className={styles.placeOrderBtn}
>
  PAY NOW
</button>
          </form>
        </div>
        
        <div className={styles.orderSummary}>
          <h2>Order Summary</h2>
          <div className={styles.items}>
            {cartItems.map(item => (
              <div key={item._id} className={styles.summaryItem}>
                <span className={styles.itemName}>{item.name} x {item.quantity}</span>
                <span className={styles.itemPrice}>₹ {item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className={styles.totalRow}>
            <span>Total</span>
       <span>₹ {totalAmount}</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Checkout;
