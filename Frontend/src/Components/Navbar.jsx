import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import styles from "../ComponetsStyles/navbar.module.css";
import { useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import axios from "axios";
//................
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

function Navbar() {
  //................
  const { cartCount, isLoggedIn, checkLogin } = useContext(CartContext);
  const envUrl = import.meta.env.VITE_API_URL;
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");

  const navTo = useNavigate();
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#4b340d",
      cancelButtonColor: "#999",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.post(
        `${envUrl}/users/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      await checkLogin();

      navTo("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = () => {
    if (!search.trim()) return;

    navTo(`/collections/${search.toLowerCase()}`);
  };
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <h1>
          L<span className={styles.diamond}></span>ARA
        </h1>
        <span className={styles.logoSub}>JEWELS</span>
      </div>
      <div className={styles.navLinks}>
        <button onClick={() => navTo("/")}>HOME</button>
        <button onClick={() => navTo("/collections")}>COLLECTION</button>
        <button onClick={() => navTo("/contact")}>CONTACT</button>
      </div>
      <div className={styles.iconSection}>
        <div className={styles.searchWrapper}>
          <CiSearch
            className={styles.searchIcon}
            onClick={() => setShowSearch(!showSearch)}
          />

          {showSearch && (
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          )}
        </div>

        <div className={styles.cartIconWrapper} onClick={() => navTo("/cart")}>
          <IoBagOutline size={24} />

          {cartCount > 0 && (
            <span className={styles.cartBadge}>{cartCount}</span>
          )}
        </div>
        {isLoggedIn ? (
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className={styles.loginBtn} onClick={() => navTo("/login")}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
