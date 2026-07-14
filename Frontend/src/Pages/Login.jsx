import React, { useState } from "react";
import styles from "../Styles/Login.module.css";
import loginImage1 from "../assets/image.png";
import loginImage2 from "../assets/CollectionPng/Bangles.png";
import loginImage3 from "../assets/CollectionPng/Ring.png";
import { useContext } from "react";
import { CartProvider } from "../context/CartContext";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

import { FaEyeSlash } from "react-icons/fa";
import { IoEye } from "react-icons/io5";

function Login() {
  const { checkLogin } = useContext(CartContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [images, setImages] = useState([]);
  const navTo = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        { email, password },
        { withCredentials: true },
      );
      if (res.data.isLogin) {
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];

        for (const item of localCart) {
          await axios.post(
            `${import.meta.env.VITE_API_URL}/cart/add`,
            {
              productId: item._id,
              quantity: item.quantity,
            },
            {
              withCredentials: true,
            },
          );
        }

        localStorage.removeItem("cart");

        await checkLogin();

        alert(res.data.message);

        navTo("/");
      }
    } catch (err) {
      if (err.response) {
        if (err.response.data) {
          alert(err.response.data.message);
        } else {
          alert("internal server error");
        }
      }
      console.log(err.message);
    }
  }
  useEffect(() => {
  fetchImages();
}, []);

const fetchImages = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/auth-page/login-images`
  );

  setImages(res.data);
};

  return (
    <div className={styles.loginPage}>
      {/* LEFT SIDE */}
      <div className={styles.leftSection}>
        <h1 className={styles.logo}>LARA</h1>

        <div className={styles.formContainer}>
          <h2>LOGIN</h2>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* EMAIL */}
            <div className={styles.inputGroup}>
              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* PASSWORD */}
            <div className={styles.inputGroup}>
              <label>Password</label>

              <div className={styles.passwordBox}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <span
                  className={styles.eyeIcon}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>

            {/* BUTTONS */}
            <button type="submit" className={styles.loginBtn}>
              CONTINUE
            </button>

            <button type="reset" className={styles.resetBtn}>
              RESET
            </button>
            <p className={styles.signupText}>
              Don't have an account?{" "}
              <Link to="/signup" className={styles.signupLink}>
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      {/* RIGHT SIDE CAROUSEL */}
      <div className={styles.rightSection}>
       <div className={styles.imageContainer}>
  {images.map((img, index) => (
    <img
      key={index}
      src={img}
      alt={`Login ${index}`}
      className={styles.loginImage}
    />
  ))}
</div>
      </div>
    </div>
  );
}

export default Login;
