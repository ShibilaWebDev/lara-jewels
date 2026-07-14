import React, { useState } from "react";
import axios from "axios";
import styles from "../ComponetsStyles/AuthPageImages.module.css";

function AuthPageImages() {
  const [files, setFiles] = useState([]);

  const uploadImages = async () => {
    try {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("images", file);
      });

      const uploadRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth-page/upload`,
        formData
      );

      await axios.put(
        `${import.meta.env.VITE_API_URL}/auth-page/login-images`,
        {
          images: uploadRes.data,
        }
      );

      alert("Images Updated");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2 className={styles.title}>Auth Page Images</h2>

      <div className={styles.uploadBox}>
        <input
          type="file"
          multiple
          className={styles.fileInput}
          onChange={(e) => setFiles([...e.target.files])}
        />

        <div className={styles.previewContainer}>
          {files.map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt=""
              className={styles.previewImage}
            />
          ))}
        </div>
      </div>

      <button
        className={styles.uploadBtn}
        onClick={uploadImages}
      >
        Upload Images
      </button>
    </div>
  );
}

export default AuthPageImages;