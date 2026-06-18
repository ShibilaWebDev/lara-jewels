import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../ComponetsStyles/Dashboard.module.css";
import { Package, Users } from "lucide-react";

function Dashboard() {
  const envUrl = import.meta.env.VITE_API_URL;

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        `${envUrl}/admin/dashboard`,
        {
          withCredentials: true,
        }
      );

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.heading}>Dashboard</h1>

      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <div className={styles.iconBox}>
            <Package size={28} />
          </div>

          <h3>Total Products</h3>
          <h2>{stats.totalProducts}</h2>
        </div>

        <div className={styles.card}>
          <div className={styles.iconBox}>
            <Users size={28} />
          </div>

          <h3>Total Users</h3>
          <h2>{stats.totalUsers}</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;