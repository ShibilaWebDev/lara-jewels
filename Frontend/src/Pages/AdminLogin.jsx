import React, { useState } from "react";
import styles from "../Styles/AdminLogin.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navTo = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const admin = { email, password };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/adminLogin`,
        admin,
        {
          withCredentials: true,
        }
      );

      if (res.data.isLogin) {
        localStorage.setItem("adminLogin", "true");

       Swal.fire({
  icon: "success",
  title: "Login Successful",
  text: res.data.message,
  confirmButtonColor: "#8B5E3C",
  background: "#fff",
  color: "#453115",
}).then(() => {
  navTo("/admin");
});
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Internal Server Error");
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2>Admin Login</h2>
        <p>Welcome Back Admin 👋</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className={styles.loginBtn}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;