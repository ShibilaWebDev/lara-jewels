import React from "react";
import Navbar from "../Components/Navbar";
import styles from "../Styles/Contact.module.css";
import Footer from "../Components/Footer";

function Contact() {
  return (
    <div className={styles.contactPage}>
      <Navbar />

      

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
      <Footer/>
    </div>
    
  );
}

export default Contact;