import React, { useState } from "react";
import axios from "axios";
import styles from "../ComponetsStyles/AddProduct.module.css";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Pencil,
  Trash2,
  Star,
  Image,
} from "lucide-react";



function AddProduct() {
  
  const envUrl = import.meta.env.VITE_API_URL;
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    offer: "",
    description: "",
    status: "available",
    imageType: "url",
    imageUrl: "",
    imageFile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    setProductData((prev) => ({
      ...prev,
      imageFile: e.target.files[0],
    }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const formData = new FormData();

    formData.append("name", productData.name);
    formData.append("category", productData.category);
    formData.append("price", productData.price);
    formData.append("stock", productData.stock);
    formData.append("offer", productData.offer);
    formData.append("description", productData.description);
    formData.append("status", productData.status);

    // IMAGE URL
    if (
      productData.imageType === "url" &&
      productData.imageUrl
    ) {

      formData.append(
        "imageUrl",
        productData.imageUrl
      );
    }

    // IMAGE FILE
    if (
      productData.imageType === "upload" &&
      productData.imageFile
    ) {

      formData.append(
        "image",
        productData.imageFile
      );
    }

    const res = await axios.post(
      `${envUrl}/admin/addproduct`,
      formData,
      {
        withCredentials: true,

        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    if (res.data) {

      alert(res.data.message);
    }

  } catch (error) {

    console.log(error);

    if (error.response?.data?.message) {

      return alert(
        error.response.data.message
      );
    }

    alert("Internal server error");
  }
};
  

  return (
     <main className={styles.mainContent}>
          {/* TOP BAR */}
          <div className={styles.topBar}>
            <h1>Add New Product</h1>
            <p>Manage your rose gold store products professionally.</p>
          </div>

          {/* FORM CARD */}
          <div className={styles.formCard}>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                {/* PRODUCT NAME */}
                <div className={styles.inputGroup}>
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={productData.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                  />
                </div>

                {/* CATEGORY */}
                <div className={styles.inputGroup}>
                  <label>Category</label>

                  <select
                    name="category"
                    value={productData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    <option value="ring">Ring</option>
                    <option value="necklace">Necklace</option>
                    <option value="bracelet">Bracelet</option>
                    <option value="earring">Earring</option>
                    <option value="watch">Bangles</option>
                    <option value="giftset">Anklets</option>
                    <option value="pendant">Watch</option>
                  </select>
                </div>

                {/* PRICE */}
                <div className={styles.inputGroup}>
                  <label>Price</label>
                  <input
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    placeholder="₹ Enter product price"
                  />
                </div>

                {/* STOCK */}
                <div className={styles.inputGroup}>
                  <label>Stock Quantity</label>
                  <input
                    type="number"
                    name="stock"
                    value={productData.stock}
                    onChange={handleChange}
                    placeholder="Available stock"
                  />
                </div>

                {/* OFFER */}
                <div className={styles.inputGroup}>
                  <label>Offer / Discount</label>
                  <input
                    type="number"
                    name="offer"
                    value={productData.offer}
                    onChange={handleChange}
                    placeholder="10% OFF"
                  />
                </div>

                {/* STATUS */}
                <div className={styles.inputGroup}>
                  <label>Product Status</label>

                  <select
                    name="status"
                    value={productData.status}
                    onChange={handleChange}
                  >
                    <option value="available">Available</option>
                    <option value="featured">Featured</option>
                    <option value="outofstock">Out Of Stock</option>
                  </select>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className={styles.inputGroup}>
                <label>Description</label>

                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Write product description..."
                />
              </div>

              {/* IMAGE SECTION */}
              <div className={styles.imageSection}>
                <div className={styles.imageHeader}>
                  <Image size={20} />
                  <h3>Product Image</h3>
                </div>

                {/* IMAGE TYPE */}
                <div className={styles.imageTypeSelector}>
                  <label>
                    <input
                      type="radio"
                      name="imageType"
                      value="url"
                      checked={productData.imageType === "url"}
                      onChange={handleChange}
                    />
                    Image URL
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="imageType"
                      value="upload"
                      checked={productData.imageType === "upload"}
                      onChange={handleChange}
                    />
                    Upload Image
                  </label>
                </div>

                {/* URL INPUT */}
                {productData.imageType === "url" ? (
                  <div className={styles.inputGroup}>
                    <input
                      type="text"
                      name="imageUrl"
                      value={productData.imageUrl}
                      onChange={handleChange}
                      placeholder="Paste image URL"
                    />
                  </div>
                ) : (
                  <div className={styles.inputGroup}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>
                )}
              </div>

              {/* BUTTONS */}
              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.submitBtn}>
                  <Star size={18} />
                  Add Product
                </button>

                <button type="reset" className={styles.resetBtn}>
                  Reset
                </button>
              </div>
            </form>
          </div>
        </main>
  )
}

export default AddProduct