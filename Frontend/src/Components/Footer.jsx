// Footer.jsx
import React from "react";
import styles from "../ComponetsStyles/Footer.module.css";
import { Truck, Tag, Star, ArrowRight } from "lucide-react";

function Footer() {
  return (
    <footer className={styles.footer}>
      {/* TOP FEATURES */}
      <div className={styles.features}>
        <div className={styles.featureBox}>
          <Truck size={34} strokeWidth={1.5} />
          <p>All India Delivery</p>
        </div>

        <div className={styles.featureBox}>
          <Tag size={34} strokeWidth={1.5} />
          <p>Made affordable</p>
        </div>

        <div className={styles.featureBox}>
          <Star size={34} strokeWidth={1.5} />
          <p>Quality Assured</p>
        </div>
      </div>

      {/* MARQUEE */}
      <div className={styles.marquee}>
        <div className={styles.track}>
          <span>Everyday Jewelry, Made Affordable</span>
          <span>Everyday Jewelry, Made Affordable</span>
          <span>Everyday Jewelry, Made Affordable</span>
          <span>Everyday Jewelry, Made Affordable</span>
          <span>Everyday Jewelry, Made Affordable</span>
          <span>Everyday Jewelry, Made Affordable</span>
        </div>
      </div>

      {/* NEWSLETTER */}
      <div className={styles.newsletter}>
        <div className={styles.left}>
          <h2>Join our email list</h2>
          <p>
            Get exclusive deals and early access to new products.
          </p>
        </div>

        <div className={styles.right}>
          <div className={styles.inputBox}>
            <input
              type="email"
              placeholder="Enter your email"
            />
            <button>
              <ArrowRight size={28} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className={styles.bottom}>
        <p>© 2026 laraJewels.com</p>

        <div className={styles.links}>
        </div>
      </div>
    </footer>
  );
}

export default Footer;