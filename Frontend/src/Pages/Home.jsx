// Home.jsx
import React, { useEffect, useState } from "react";
import style from "../Styles/Home.module.css";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Bangles from "../assets/CollectionPng/Bangles.png";
import Necklace from "../assets/CollectionPng/Necklaces.png";
import Ring from "../assets/CollectionPng/Ring.png";
import Earrings from "../assets/CollectionPng/Earrings.png";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

import "swiper/css";
import "swiper/css/pagination";

function Home() {
  const navTo = useNavigate();
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [heroImage, setHeroImage] = useState("");
  const { addToCart } = useContext(CartContext);
  const envUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${envUrl}/products/getProducts`,

          {
            withCredentials: true,
          },
        );
        const allProducts = res.data.products;

        // Extract unique categories and their first image
        const uniqueCategories = [];
        const categoryMap = new Map();
        allProducts.forEach((product) => {
          if (!categoryMap.has(product.category)) {
            categoryMap.set(product.category, product);
            uniqueCategories.push(product);
          }
        });
        setCategories(uniqueCategories);
        const featured = allProducts.filter(
          (item) => item.status === "featured",
        );

        console.log("Featured Products:", featured, "HEY");

        setFeaturedProducts(featured);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, [envUrl]);
  useEffect(() => {
    console.log(featuredProducts);
  }, [featuredProducts]);
  useEffect(() => {
    axios
      .get(`${envUrl}/hero-image`)
      .then((res) => {
        setHeroImage(res.data.image);
      })
      .catch(console.error);
  }, []);
  return (
    <div className={style.home}>
      <Navbar />

      {/* Hero Section */}
      <section className={style.hero}>
        <div className={style["hero-text"]}>
          <h1>DISCOVER OUR NEW LAUNCHES!</h1>

          <p>
            Elegant and stylish jewelry collection designed for modern women.
            Discover the finest pieces from our collections and explore all that we offer.
          </p>

          <button onClick={() => navTo("/collections")}>Shop Now</button>
        </div>

        <div className={style["hero-image"]}>
          <img
            src={
              heroImage
                ? `${envUrl}${heroImage}`
                : "https://images.pexels.com/photos/13924051/pexels-photo-13924051.jpeg"
            }
            alt="Hero"
          />
        </div>
      </section>
      {/* Categories Section */}
      <section className={style["categories-section"]}>
        <h2 className={style["category-heading"]}>Collections</h2>

        <section className={style["category-grid"]}>
          {categories.map((cat) => {
            const imageSrc = cat.imageUrl?.length
              ? cat.imageUrl[0].startsWith("http")
                ? cat.imageUrl[0]
                : `${envUrl}${cat.imageUrl[0]}`
              : "https://via.placeholder.com/400";

            return (
              <div
  key={cat.category}
  className={style["category-card"]}
  onClick={() => navTo(`/collections/${cat.category}`)}
>
  <div className={style.imgBox}>
    <img src={imageSrc} alt={cat.category} />

    <div className={style.overlay}>
      <h3>{cat.category}</h3>
      <button>Explore</button>
    </div>
  </div>
</div>
            );
          })}
        </section>
      </section>

      <section className={style.featuredSection}>
        <div className={style.featuredTitle}>
          <span></span>
          <h2>Virals You searching for</h2>
        </div>

        <Swiper
  slidesPerView={5}
  spaceBetween={25}
  loop={true}
  autoplay={{
    delay: 1,
    disableOnInteraction: false,
  }}
  speed={4000}
  pagination={{
    clickable: true,
  }}
  modules={[Pagination, Autoplay]}
  className={style.featuredSwiper}
  breakpoints={{
    0: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 25,
    },
  }}
>
          {featuredProducts.map((product) => {
            console.log(product);
            const imageSrc = product.imageUrl?.[0]?.startsWith("http")
              ? product.imageUrl[0]
              : `${envUrl}${product.imageUrl?.[0]}`;

            return (
            <SwiperSlide key={product._id}>
  <div
    className={style.featuredCard}
    onClick={() => {
      const slug = product.name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");

      navTo(`/collections/${product.category}/${slug}`, {
        state: {
          id: product._id,
        },
      });
    }}
  >
    <img src={imageSrc} alt={product.name} />
    <h3>{product.name}</h3>
  </div>
</SwiperSlide>
            );
          })}
        </Swiper>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
