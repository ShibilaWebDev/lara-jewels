import React, { useState } from "react";
import { IoEye } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import styles from "../Styles/Signup.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Signup() {
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navTo = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();

    try {
      const user = {
        name,
        email,
        password,
        role: "user",
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/register`,
        user
      );

      if (res.data.isRegistered) {
        alert(res.data.message);
        navTo("/login");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Server Error");
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
    <div className={styles.signupPage}>
      {/* LEFT SIDE */}
      <div className={styles.leftSection}>
        <h1 className={styles.logo}>LARA</h1>

        <div className={styles.formContainer}>
          <h2>CREATE ACCOUNT</h2>

          <form className={styles.form} onSubmit={handleSignup}>
            <div className={styles.inputGroup}>
              <label>NAME</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>EMAIL</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>PASSWORD</label>

              <div className={styles.passwordBox}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <span
                  className={styles.eyeIcon}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>

            <button type="submit" className={styles.signupBtn}>
              SIGN UP
            </button>

            <button type="reset" className={styles.resetBtn}>
              RESET
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className={styles.rightSection}>
        <div className={styles.carousel}>
        {images.map((img, index) => (
  <img
    key={index}
    src={img}
    alt=""
    className={styles.slide}
  />
))}
        </div>
      </div>
    </div>
  );
}

export default Signup;