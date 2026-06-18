// AdminLogin.jsx
import React, { useState } from "react";
import styles from "../Styles/AdminLogin.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const navTo =useNavigate()

  async function handleSubmit(e){
    e.preventDefault();
   try{
     const admin ={email,password}
     const res=await axios.post("http://localhost:3000/users/adminLogin",admin,{withCredentials:true})
       if(res.data.isLogin){
        alert(res.data.message)
        navTo("/admin")
        
      }
   }catch(err){
    if(err.response){
      if(err.response.data){
        alert(err.response.data.message)
      }else{  
        alert("internal server error")
      }
    } 
    console.log(err.message);
    
   }

   
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>

        <h2>Admin Login</h2>
        <p>Welcome back Admin 👋</p>

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

          <button type="submit" className={styles.loginBtn}>
            Login
          </button>

        </form>
      </div>
    </div>
  );
}

export default AdminLogin;