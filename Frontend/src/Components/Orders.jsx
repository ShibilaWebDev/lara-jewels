import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../ComponetsStyles/Order.module.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  const envUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${envUrl}/orders`, {
        withCredentials: true,
      });
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${envUrl}/orders/${id}`, {
        withCredentials: true,
      });

      setOrders((prev) => prev.filter((order) => order._id !== id));

      alert("Order deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to delete order");
    }
  };
  return (
    <div className={styles.ordersContainer}>
      <h1 className={styles.title}>Orders</h1>

      <table className={styles.ordersTable}>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Email</th>
            <th>Address</th>
            <th>Ordered Products</th>
            <th>Total Amount</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order.customerName}</td>

                <td>{order.email}</td>

                <td>
                  {order.address}
                  <br />
                  {order.city} - {order.zip}
                  <br />
                  {order.country}
                </td>

                <td>
                  {order.products?.map((item, index) => (
                    <div key={index} className={styles.productItem}>
                      <strong>{item.name}</strong>
                      <br />
                      Qty: {item.quantity}
                      <br />
                      Price: ₹ {item.price}
                      <hr />
                    </div>
                  ))}
                </td>

                <td className={styles.totalAmount}>
                  ₹ {order.totalAmount || 0}
                </td>
                <td className={styles.payment}>{order.paymentMethod}</td>

                <td>
                  <span className={styles.status}>{order.status}</span>
                </td>

                <td>{new Date(order.createdAt).toLocaleString()}</td>

                <td>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className={styles.noOrders}>
                No Orders Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
