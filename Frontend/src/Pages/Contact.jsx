import React from "react";
import Navbar from "../Components/Navbar";
import styles from "../Styles/Contact.module.css";

function Contact() {
  return (
    <div className={styles.contactPage}>
      <Navbar />

      <div className={styles.hero}>
        <h1>Contact Us</h1>
        <p>We're here to help you with any questions about LARA Jewels.</p>
      </div>

      <div className={styles.contactCard}>
        <div className={styles.infoBox}>
          <h3>Business Information</h3>

          <div className={styles.item}>
            <span>Trade Name</span>
            <p>LARA Jewels</p>
          </div>

          <div className={styles.item}>
            <span>Phone Number</span>
            <p>+91 9087654321</p>
          </div>

          <div className={styles.item}>
            <span>Email Address</span>
            <p>larajewels@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Contact;