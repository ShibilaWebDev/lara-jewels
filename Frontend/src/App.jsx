import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Collections from "./Pages/Collections";
import ProductView from "./Pages/ProductView";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Contact from "./Pages/Contact";
import About from "./Pages/About";

import Admin from "./Pages/Admin";
import AdminLogin from "./Pages/AdminLogin";
import AdminProtected from "./Components/AdminProtected";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/collections" element={<Collections />} />

      <Route path="/collections/:category" element={<Collections />} />

      <Route
        path="/collections/:category/:slug"
        element={<ProductView />}
      />

      <Route path="/cart" element={<Cart />} />

      <Route path="/checkout" element={<Checkout />} />

      <Route path="/contact" element={<Contact />} />

      <Route path="/about" element={<About />} />

      <Route path="/adminLogin" element={<AdminLogin />} />

      <Route
        path="/admin"
        element={
          <AdminProtected>
            <Admin />
          </AdminProtected>
        }
      />

    </Routes>
  );
}

export default App;