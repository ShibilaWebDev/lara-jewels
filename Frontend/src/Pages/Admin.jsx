import React, { useState } from "react";
import axios from "axios";
import styles from "../Styles/Admin.module.css";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Pencil,
  Trash2,
  Star,
  Grip,
  Image,
} from "lucide-react";
import Navbar from "../Components/Navbar";
import AddProduct from "../Components/AddProduct";
import ManageProducts from "../Components/ManageProducts";
import Dashboard from "../Components/Dashboard";
import Orders from "../Components/Orders";

function Admin() {
  const [active, setActive] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users/users");
      setUsers(res.data);
      setActive("users"); // show users section
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/delete/${id}`);

      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.adminContainer}>
        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <div className={styles.logoSection}>
            <h2>Ornaments Admin</h2>
          </div>

          <nav className={styles.navMenu}>
            <button
              onClick={() => setActive("add-product")}
              className={active == "add-product" ? styles.activeNav : ""}
            >
              <LayoutDashboard size={18} />
              Add products
            </button>

            <button
              onClick={() => setActive("dashboard")}
              className={active === "dashboard" ? styles.activeNav : ""}
            >
              <Package size={18} />
              Dashboard
            </button>

            <button
              onClick={() => setActive("manage-product")}
              className={active == "manage-product" ? styles.activeNav : ""}
            >
              <Grip size={18} />
              Manage products
            </button>

            

            <button
              onClick={() => setActive("orders")}
              className={active === "orders" ? styles.activeNav : ""}
            >
              <ShoppingCart size={18} />
              Orders
            </button>

            <button onClick={getUsers}>
              <Users size={18} />
              Users
            </button>
          </nav>
        </aside>

        {active == "add-product" && <AddProduct />}
        {active == "manage-product" && <ManageProducts />}
        {active === "dashboard" && <Dashboard />}

        {active === "orders" && <Orders />}
        {active === "users" && (
          <div className={styles.usersContainer}>
            <h2 className={styles.usersTitle}>All Users</h2>

            <table className={styles.usersTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Registered</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role || "user"}</td>
                      <td>
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => deleteUser(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className={styles.noUsers}>
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Admin;
