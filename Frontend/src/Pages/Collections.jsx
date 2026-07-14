import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import axios from 'axios';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styles from '../Styles/Collections.module.css';

function Collections() {
  
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(category || 'all');
  const [searchParams] = useSearchParams();
const searchText = searchParams.get("search") || "";
  const navigate = useNavigate();
  const envUrl = import.meta.env.VITE_API_URL;
useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  useEffect(() => {
    if (category) {
      setFilter(category);
    } else {
      setFilter('all');
    }
  }, [category]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
        `${envUrl}/products/getProducts`,
        
        {
          withCredentials: true,
        },
      );
        setProducts(res.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [envUrl]);

 const filteredProducts = products.filter((p) => {
  const categoryMatch =
    filter === "all"
      ? true
      : p.category.toLowerCase() === filter.toLowerCase();

const searchMatch =
  searchText === ""
    ? true
    : p.category.toLowerCase() === searchText.toLowerCase();
  return categoryMatch && searchMatch;
});
console.log("URL category:", category);
console.log("Filter:", filter);
console.log(
  "Product categories:",
  products.map((p) => p.category)
);
console.log("Filtered products:", filteredProducts);

  const headerTitle = filter === 'all' ? 'All Collections' : filter;

  function handleCategory(productId, product) {
  const slug = product.name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

  navigate(`/collections/${product.category}/${slug}`, {
    state: {
      id: productId,
    },
  });
}

  return (
    <div className={styles.container}>
      <Navbar/>
      
     <div className={styles.header}>
  <div className={styles.titleWrapper}>
    <span className={styles.line}></span>
    <h1>{headerTitle}</h1>
    <span className={styles.line}></span>
  </div>

  {filter === "all" && (
    <p>
      Discover our exclusive range of fine jewelry, crafted to perfection.
    </p>
  )}
</div>

      <div className={styles.filterSection}>
        <span style={{color: '#735832', marginRight: 'auto'}}>{filteredProducts.length} items</span>
        <select value={filter} onChange={(e) => { setFilter(e.target.value); navigate(`/collections/${e.target.value}`) }} className={styles.filterSelect}>
          <option value="all">All Categories</option>
          <option value="ring">Rings</option>
          <option value="necklace">Necklaces</option>
          <option value="bracelet">Bracelets</option>
          <option value="earring">Earrings</option>
          <option value="bangle">Bangles</option>
          <option value="anklet">Anklets</option>
          <option value="watch">Watches</option>
        </select>
      </div>

      <div className={styles.productGrid}>
        {loading ? (
          <p>Loading...</p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map(product => {
            const imageSrc = product.imageUrl?.length ? (product.imageUrl[0].startsWith('http') ? product.imageUrl[0] : `${envUrl}${product.imageUrl[0]}`) : "https://via.placeholder.com/400";
            
            return (
              <div onClick={()=>handleCategory(product._id,product)} key={product._id} className={styles.productCard} >
                <div className={styles.imageContainer}>
                  <img src={imageSrc} alt={product.name}
  onError={(e)=>e.target.src=`${envUrl}/uploads/noImage.png`}
                   />
                  {product.stock <= 0 && <span className={styles.badgeSoldOut}>Sold out</span>}
                  {product.offer > 0 && product.stock > 0 && <span className={styles.badgeSale}>Sale</span>}
                </div>
                <div className={styles.productInfo}>
                  <h3>{product.name}</h3>
                  {product.offer > 0 ? (
                    <p className={styles.price}>
                      <span className={styles.discountPrice}>₹ {Math.round(product.price - (product.price * (product.offer/100)))}</span>
                      <span className={styles.originalPrice}>₹ {product.price}</span>
                    </p>
                  ) : (
                    <p className={styles.price}>₹ {product.price}</p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p style={{gridColumn: '1 / -1', textAlign: 'center'}}>No products found in this category.</p>
        )}
      </div>

      <Footer/>
    </div>
  );
}

export default Collections;
