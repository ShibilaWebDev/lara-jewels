// ManageProducts.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../ComponetsStyles/ManageProduct.module.css";

import { Pencil, Trash2, Save, X, Search } from "lucide-react";

function ManageProducts() {
  const envUrl = import.meta.env.VITE_API_URL;

  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editImage, setEditImage] = useState(null);

  // SEARCH + FILTER
  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("all");

  // EDIT DATA
  const [editData, setEditData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    offer: "",
    description: "",
  });

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await axios.post(
        `${envUrl}/admin/getProducts`,
        {},
        {
          withCredentials: true,
        },
      );

      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Delete this product?");

      if (!confirmDelete) return;

      await axios.delete(`${envUrl}/admin/deleteProduct/${id}`, {
        withCredentials: true,
      });

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT PRODUCT
  const handleEdit = (product) => {
    setEditingId(product._id);

    setEditData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      offer: product.offer,
      description: product.description,
    });

    setEditImage(null);
  };

  // SAVE PRODUCT
  const handleSave = async (id) => {
    try {
      const formData = new FormData();

      formData.append("name", editData.name);
      formData.append("category", editData.category);
      formData.append("price", editData.price);
      formData.append("stock", editData.stock);
      formData.append("offer", editData.offer);
      formData.append("description", editData.description);

      if (editImage) {
        formData.append("image", editImage);
      }

      const res = await axios.put(
        `${envUrl}/admin/updateproduct/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (res.data.isUpdated) {
        fetchProducts();
        setEditingId(null);
        alert("Product Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  // FILTER PRODUCTS
  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" ? true : product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className={styles.mainContent}>
      {/* TOP BAR */}
      <div className={styles.topBar}>
        <h1>Manage Products</h1>

        <p>Edit, search and delete jewelry products.</p>
      </div>

      {/* FILTER SECTION */}
      <div className={styles.filterSection}>
        {/* SEARCH */}
        <div className={styles.searchBox}>
          <Search size={18} />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* CATEGORY FILTER */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>

          <option value="ring">Ring</option>

          <option value="necklace">Necklace</option>

          <option value="bracelet">Bracelet</option>

          <option value="earring">Earring</option>

          <option value="watch">Watch</option>

          <option value="bangle">Bangle</option>
          <option value="anklet">Anklet</option>
        </select>
      </div>

      {/* PRODUCTS */}
      <div className={styles.productGrid}>
        {filteredProducts.map((product) => (
          <div key={product._id} className={styles.productCard}>
            {/* IMAGE */}
            <img
              src={
                product.imageUrl?.[0]?.startsWith("/uploads")
                  ? `http://localhost:3000${product.imageUrl[0]}`
                  : product.imageUrl?.[0]
              }
              alt={product.name}
            />
            {/* EDIT MODE */}
            {editingId === product._id ? (
              <>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      name: e.target.value,
                    })
                  }
                />

                <select
                  value={editData.category}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      category: e.target.value,
                    })
                  }
                >
                  <option value="ring">Ring</option>

                  <option value="necklace">Necklace</option>

                  <option value="bracelet">Bracelet</option>

                  <option value="earring">Earring</option>

                  <option value="watch">Watch</option>

                  <option value="bangle">Bangle</option>
                  
                  <option value="anklet">Anklet</option>
                </select>

                <input
                  type="number"
                  value={editData.price}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      price: e.target.value,
                    })
                  }
                />

                <input
                  type="number"
                  value={editData.stock}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      stock: e.target.value,
                    })
                  }
                />

                <input
                  type="number"
                  value={editData.offer}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      offer: e.target.value,
                    })
                  }
                />

                <textarea
                  rows="4"
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      description: e.target.value,
                    })
                  }
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditImage(e.target.files[0])}
                />

                {editImage && (
                  <img
                    src={URL.createObjectURL(editImage)}
                    alt="Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      marginTop: "10px",
                    }}
                  />
                )}

                <div className={styles.actionButtons}>
                  <button
                    className={styles.saveBtn}
                    onClick={() => handleSave(product._id)}
                  >
                    <Save size={16} />
                    Save
                  </button>

                  <button
                    className={styles.cancelBtn}
                    onClick={() => setEditingId(null)}
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3>{product.name}</h3>

                <p>₹ {product.price}</p>

                <span>Category : {product.category}</span>

                <span>Stock : {product.stock}</span>

                <span>Offer : {product.offer}%</span>

                <span>Status : {product.status}</span>

                <span>
                  Created : {new Date(product.createdAt).toLocaleDateString()}
                </span>

                <span>
                  Updated : {new Date(product.updatedAt).toLocaleDateString()}
                </span>

                <div className={styles.actionButtons}>
                  <button
                    className={styles.editBtn}
                    onClick={() => handleEdit(product)}
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(product._id)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

export default ManageProducts;
