import React, { useState } from "react";
import axios from "axios";
import "../ComponetsStyles/HeroImage.css";

function HeroImage() {
  const [file, setFile] = useState(null);

  const uploadHeroImage = async () => {
    if (!file) return alert("Select an image");

    try {
      const formData = new FormData();
      formData.append("heroImage", file);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/hero-image/upload`,
        formData
      );

      alert("Hero image uploaded successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="heroUploadContainer">
      <h2>Home Page Hero Image</h2>

      <label className="uploadBox">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <span>
          {file ? file.name : "Choose Hero Image"}
        </span>
      </label>

      <button
        className="uploadBtn"
        onClick={uploadHeroImage}
      >
        Upload Hero Image
      </button>
    </div>
  );
}

export default HeroImage;