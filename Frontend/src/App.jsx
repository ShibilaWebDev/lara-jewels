import React from "react";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Collections from "./Pages/Collections";
import Contact from "./Pages/Contact";
import Admin from "./Pages/Admin";
import About from "./Pages/About";
import AdminLogin from "./Pages/AdminLogin";
import Checkout from "./Pages/Checkout";
import Cart from "./Pages/Cart";
import ProductView from "./Pages/ProductView";

function App() {
  return (
    <>
      {/* <Navbar/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/:category" element={<Collections />} />
        {/* <Route path="/collections/:category/:id" element={<ProductView />} /> */}
        <Route path="/collections/:category/:slug" element={<ProductView />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
      </Routes>
    </>
  );
}

export default App;
