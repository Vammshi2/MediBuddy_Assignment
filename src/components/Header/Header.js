// import React, { useState, useEffect } from "react";
// import "./Header.css";

// const Header = () => {
//   const [walletBalance, setWalletBalance] = useState(0);
//   const [cartCount, setCartCount] = useState(0);

//   useEffect(() => {
//     async function fetchHeaderData() {
//       try {
//         // Fetch data from the API
//         const response = await fetch(
//           "https://677f757b0476123f76a68a42.mockapi.io/api/labs/v1/page_config"
//         );
//         const data = await response.json();

//         // Extracting wallet balance and cart count dynamically from API response
//         const walletData = data[0]?.props?.walletBalance || 4529; // Replace with the correct field if needed
//         const cartData = data[0]?.props?.cartCount || 1; // Replace with the correct field if needed

//         // Update state
//         setWalletBalance(walletData);
//         setCartCount(cartData);
//       } catch (error) {
//         console.error("Failed to fetch data:", error);
//       }
//     }

//     fetchHeaderData();
//   }, []);

//   return (
//     <header className="header">
//       <div className="location">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="currentColor"
//           className="arrow-left"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M15.75 19.5L8.25 12l7.5-7.5"
//           />
//         </svg>
//         <div className="location-info">
//           <span className="location-title">Billekahalli</span>
//           <span className="location-subtitle">Sarvabhoumanagar Billekahall...</span>
//         </div>
//       </div>
//       <div className="wallet-cart">
//         <div className="wallet">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
//             alt="wallet"
//             className="wallet-icon"
//           />
//           <span className="wallet-balance">{walletBalance}</span>
//         </div>
//         <div className="cart">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/1170/1170576.png"
//             alt="cart"
//             className="cart-icon"
//           />
//           <span className="cart-count">{cartCount}</span>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "./Header.css";

const Header = () => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    async function fetchHeaderData() {
      try {
        // Fetch data from the API
        const response = await fetch(
          "https://677f757b0476123f76a68a42.mockapi.io/api/labs/v1/page_config"
        );
        const data = await response.json();

        // Extract wallet balance and cart count from API response
        const walletData = data[0]?.props?.walletBalance || 4529; // Adjust key as per the API response
        const cartData = data[0]?.props?.cartCount || 1; // Adjust key as per the API response

        // Update state
        setWalletBalance(walletData);
        setCartCount(cartData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    fetchHeaderData();
  }, []);

  // Handle back navigation
  const handleBack = () => {
    navigate("/"); // Redirect to the home page
  };

  return (
    <header className="header">
      <div className="location" onClick={handleBack} style={{ cursor: "pointer" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="arrow-left"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
        <div className="location-info">
          <span className="location-title">Billekahalli</span>
          <span className="location-subtitle">Sarvabhoumanagar Billekahall...</span>
        </div>
      </div>
      <div className="wallet-cart">
        <div className="wallet">
          <img
            src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
            alt="wallet"
            className="wallet-icon"
          />
          <span className="wallet-balance">₹{walletBalance}</span>
        </div>
        <div className="cart">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1170/1170576.png"
            alt="cart"
            className="cart-icon"
          />
          <span className="cart-count">{cartCount}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
