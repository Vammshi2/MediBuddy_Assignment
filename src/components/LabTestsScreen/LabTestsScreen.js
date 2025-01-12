import React, { useEffect, useState } from "react";
import "./LabTestsScreen.css";

const LabTestsScreen = () => {
  const [icons, setIcons] = useState([]);
  const [categories, setCategories] = useState([]);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch("https://677f757b0476123f76a68a42.mockapi.io/api/labs/v1/page_config")
      .then((response) => response.json())
      .then((data) => {
        const pageConfig = data[0]?.page_config || [];
        const iconsData = pageConfig
          .find((config) => config.title === "Icons")
          ?.props.map((icon) => ({
            text: icon.iconText,
            url: icon.iconUrl,
            deeplink: icon.deeplink,
          }));
        const categoriesData =
          pageConfig.find(
            (config) => config.heading === "Featured Health Check-up Packages"
          )?.categories["10386"] || [];
        const packagesData =
          pageConfig
            .find(
              (config) => config.heading === "Featured Health Check-up Packages"
            )
            ?.props[0]?.packages || [];

        setIcons(iconsData || []);
        setCategories(categoriesData || []);
        setPackages(packagesData || []);
      });
  }, []);

  return (
    <div className="lab-tests-screen">
      <div className="header">
        <h2>Book Popular Lab Tests</h2>
        <button className="view-more-button">View More</button>
      </div>

      <div className="categories">
        {categories.map((category, index) => (
          <button key={index} className="category-button">
            {category}
          </button>
        ))}
      </div>

      <div className="package-list">
        {packages.map((pkg) => (
          <div key={pkg.packageId} className="package-card">
            <div className="package-header">
              <h3>{pkg.packageName}</h3>
              <span className="cashless-tag">
                {pkg.isSponsored ? "Cashless" : ""}
              </span>
            </div>
            <p className="reports-time">{pkg.reportsTatText}</p>
            <div className="package-details">
              <div className="icons">
                {pkg.visitType.map((type) => (
                  <span key={type}>{type === "HomeVisit" ? "🏠 Home" : "🏥 Lab"}</span>
                ))}
              </div>
              <div className="price-section">
                <p className="original-price">₹ {pkg.priceRange}</p>
                <p className="discounted-price">₹ {pkg.price} Onwards</p>
                <span className="discount">{pkg.discount}% OFF</span>
              </div>
              <button className="add-button">Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabTestsScreen;
