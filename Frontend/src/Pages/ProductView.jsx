// // ProductView.jsx
// import React, { useContext, useEffect, useState } from "react"; //...........nj
// import styles from "../Styles/ProductView.module.css";
// import Navbar from "../Components/Navbar";
// import Footer from "../Components/Footer";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import { Heading1 } from "lucide-react";
// //.......nj
// import { CartContext } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";

// function ProductView() {
//   //...........nj
//   const { addToCart } = useContext(CartContext);
//   const navigate = useNavigate();

//   const [product, setProduct] = useState();
//   const [isLoading, setIsLoading] = useState(true);
//   const location = useLocation();
//   console.log(location.state.id);
//   useEffect(() => {
//     console.log(location.state.id);

//     axios
//       .get(
//         `${import.meta.env.VITE_API_URL}/products/product/${location.state.id}`,
//         { withCredentials: true },
//       )
//       .then((res) => {
//         if (res.data.isFound) {
//           setProduct(res.data.result);
//           setIsLoading(false);
//         }
//       })
//       .catch((error) => setIsLoading(true));
//   }, []);

//   if (isLoading) {
//     return <h1>loading</h1>;
//   }
//   if (!product) {
//     return <h1>no product</h1>;
//   }
//   const discount = product.price - (product.price * product.offer) / 100;
//   //...........nj
//   const handleAddToCart = () => {
//     addToCart(product);
//     navigate("/cart");
//   };

//   return (
//     <>
//       <Navbar />

//       <div className={styles.productPage}>
//         <div className={styles.productContainer}>
//           {/* Left Side Image */}
//           <div className={styles.imageSection}>
//             <img
//               src={product.imageUrl[0]}
//               alt={product.name}
//               className={styles.productImage}
//             />
//           </div>

//           {/* Right Side Details */}
//           <div className={styles.detailsSection}>
//             <p className={styles.category}>{product.category}</p>

//             <h1 className={styles.productName}>{product.name}</h1>

//             <div className={styles.priceSection}>
//               <span className={styles.discountPrice}>₹{discount}</span>

//               <span className={styles.originalPrice}>₹{product.price}</span>

//               <span className={styles.offer}>{product.offer}% OFF</span>
//             </div>

//             <p className={styles.description}>{product.description}</p>

//             <div className={styles.stock}>
//               Stock Available : {product.stock}
//             </div>

//             <div className={styles.status}>Status : {product.status}</div>

//             <div className={styles.buttonGroup}>
//               <button className={styles.cartBtn} onClick={handleAddToCart}>
//                 Add To Cart
//               </button>
//               <button className={styles.buyBtn}>Buy Now</button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// }

// export default ProductView;

// ProductView.jsx
import React, { useContext, useEffect, useState } from "react";
import styles from "../Styles/ProductView.module.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function ProductView() {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  

useEffect(() => {
  axios
    .get(`${import.meta.env.VITE_API_URL}/users/isLogin`, {
      withCredentials: true,
    })
    .then((res) => {
      setIsLogin(res.data.isLogin);
    })
    .catch(() => {
      setIsLogin(false);
    });
}, []);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/products/product/${location.state.id}`,
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.isFound) {
          setProduct(res.data.result);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!product) {
    return <h1>No Product Found</h1>;
  }

  const discount = product.price - (product.price * product.offer) / 100;

  // Add To Cart
//  const handleAddToCart = async () => {
//   try {
//     if (isLogin) {
//       await axios.post(
//         `${import.meta.env.VITE_API_URL}/cart/add`,
//         {
//           productId: product._id,
//           quantity: 1,
//         },
//         {
//           withCredentials: true,
//         }
//       );
//     } else {
//       addToCart(product);
//     }

//     navigate("/cart");
//   } catch (error) {
//     console.log(error);
//   }
// };
const handleAddToCart = () => {
  addToCart(product);
  navigate("/cart");
};

  // Buy Now
  const handleBuyNow = () => {
    addToCart(product);
    navigate("/checkout");
  };

  return (
    <>
      <Navbar />

      <div className={styles.productPage}>
        <div className={styles.productContainer}>
          {/* Left Side Image */}
          <div className={styles.imageSection}>
            {/* <img
              src={product.imageUrl[0]}
              alt={product.name}
              className={styles.productImage}
            /> */}
            <img
  src={
    product.imageUrl?.[0]?.startsWith("/uploads")
      ? `${import.meta.env.VITE_API_URL}${product.imageUrl[0]}`
      : product.imageUrl?.[0]
  }
  className={styles.productImage}
  alt={"https://lara-jewels-store.vercel.app"+product.name}
  onError={(e)=>e.target.src=`https://lara-jewels-store.vercel.app/uploads/1782636116762.jpg`}
/> </div>

          {/* Right Side Details */}
          <div className={styles.detailsSection}>
            <p className={styles.category}>{product.category}</p>

            <h1 className={styles.productName}>{product.name}</h1>

            <div className={styles.priceSection}>
              <span className={styles.discountPrice}>
                ₹{discount}
              </span>

              <span className={styles.originalPrice}>
                ₹{product.price}
              </span>

              <span className={styles.offer}>
                {product.offer}% OFF
              </span>
            </div>

            <p className={styles.description}>
              {product.description}
            </p>

            <div className={styles.stock}>
              Stock Available : {product.stock}
            </div>

            <div className={styles.status}>
              Status : {product.status}
            </div>

            <div className={styles.buttonGroup}>
              <button
                className={styles.cartBtn}
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>

              <button
                className={styles.buyBtn}
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductView;
