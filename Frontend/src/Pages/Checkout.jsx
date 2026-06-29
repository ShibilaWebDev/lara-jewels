import React, { useContext, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { CartContext } from '../context/CartContext';
import styles from '../Styles/Checkout.module.css';

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const envUrl = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    country: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // TOTAL AMOUNT
  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + ((item.productId?.price || item.price || 0) * item.quantity),
    0
  );

  // GET SELECTED PAYMENT METHOD
  const getPaymentMethod = () => {
    return document.querySelector('input[name="payment"]:checked')?.value;
  };

  // ORDER API CALL (COD or after payment)
const handleCheckout = async () => {
  try {
    const response = await axios.post(`${envUrl}/orders/create`, {
      customerName: formData.firstName + " " + formData.lastName,
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

      totalAmount,
      paymentMethod: getPaymentMethod() === "card" ? "Razorpay" : "COD",
    });

    console.log("Order Success:", response.data);

    setShowSuccess(true);

    setTimeout(() => {
      clearCart();
      navigate("/");
    }, 5000);

  } catch (error) {
    console.log("Order Error:", error);
    alert("Order failed");
  }
};

  // RAZORPAY PAYMENT
 
  const handlePayment = async () => {
  try {
    // Create Razorpay Order
    const { data } = await axios.post(
      `${envUrl}/api/payment/create-order`,
      {
        amount: totalAmount,
      }
    );

    const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount: data.order.amount,
  currency: data.order.currency,
  order_id: data.order.id,

  name: "LARA Jewels",
  description: "Jewellery Purchase",

  prefill: {
    name: `${formData.firstName} ${formData.lastName}`,
    email: formData.email,
  },

  theme: {
    color: "#A67B5B",
  },

  handler: async function (response) {
    try {
      const verify = await axios.post(
        `${envUrl}/api/payment/verify-payment`,
        response
      );

      if (verify.data.success) {
        await handleCheckout();

        setShowSuccess(true);

        setTimeout(() => {
          clearCart();
          navigate("/");
        }, 5000);
      } else {
        alert("Payment Verification Failed");
      }
    } catch (err) {
      console.log(err);
      alert("Payment Verification Error");
    }
  },

  modal: {
    ondismiss: function () {
      console.log("Payment popup closed");
    },
  },
};

    const razorpay = new window.Razorpay(options);
    razorpay.open();

  } catch (error) {
    console.log(error);
    alert("Unable to create payment order");
  }
};

  // MAIN BUTTON CLICK
const handleSubmit = () => {
  const {
    firstName,
    lastName,
    email,
    address,
    city,
    zip,
    country
  } = formData;

  if (
    !firstName.trim() ||
    !lastName.trim() ||
    !email.trim() ||
    !address.trim() ||
    !city.trim() ||
    !zip.trim() ||
    !country.trim()
  ) {
    setShowError(true);

    setTimeout(() => {
      setShowError(false);
    }, 3000);

    return;
  }

  const selectedPayment = getPaymentMethod();

  if (selectedPayment === "card") {
    handlePayment(); // Razorpay Payment
  } else {
    handleCheckout(); // Cash On Delivery
  }
};
  // EMPTY CART
  if (cartItems.length === 0) {
    return (
      <div className={styles.container}>
        <Navbar />

        <div className={styles.emptyCheckout}>
          <h2>Your cart is empty</h2>
          <button onClick={() => navigate('/collections')}>
            Return to Shop
          </button>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Navbar />

      <div className={styles.checkoutWrapper}>
        {/* FORM SECTION */}
        <div className={styles.formSection}>
          <h2>Shipping Information</h2>

          <form className={styles.form}>
            <div className={styles.row}>
              <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
              <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
            </div>

            <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
            <input type="text" name="address" placeholder="Address" onChange={handleChange} required />

            <div className={styles.row}>
              <input type="text" name="city" placeholder="City" onChange={handleChange} required />
              <input type="text" name="zip" placeholder="ZIP Code" onChange={handleChange} required />
            </div>

            <input type="text" name="country" placeholder="Country" onChange={handleChange} required />

            {/* PAYMENT METHOD */}
            <h2>Payment Method</h2>

            <div className={styles.paymentMethods}>
              <label>
                <input type="radio" name="payment" value="card" defaultChecked />
                Razorpay (Online Payment)
              </label>

              <label>
                <input type="radio" name="payment" value="cod" />
                Cash on Delivery
              </label>
            </div>

            <button type="button" onClick={handleSubmit} className={styles.placeOrderBtn}>
              PLACE ORDER
            </button>
          </form>
        </div>

        {/* ORDER SUMMARY */}
        <div className={styles.orderSummary}>
          <h2>Order Summary</h2>

          <div className={styles.items}>
            {cartItems.map(item => (
              <div key={item._id} className={styles.summaryItem}>
                <span>
  {(item.productId?.name || item.name)} x {item.quantity}
</span>

<span>
  ₹ {(item.productId?.price || item.price) * item.quantity}
</span>
              </div>
            ))}
          </div>

          <div className={styles.totalRow}>
            <span>Total</span>
            <span>₹ {totalAmount}</span>
          </div>
        </div>
         </div>

      {/* Error Popup */}
      {showError && (
        <div className={styles.errorOverlay}>
          <div className={styles.errorPopup}>
            <div className={styles.errorIcon}>!</div>
            <h2>Missing Details</h2>
            <p>Please fill all required fields.</p>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccess && (
        <div className={styles.successOverlay}>
          <div className={styles.successPopup}>
            <div className={styles.checkmark}>✓</div>
            <h2>Order Successful!</h2>
            <p>Thank you for your purchase.</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Checkout;