// HealthCheckupList.js
import React, { useEffect, useState } from "react";
import "./HealthCheckupList.css";

const HealthCheckupList = () => {
  const [categories, setCategories] = useState([]);
  const [checkupData, setCheckupData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Popular");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://677f757b0476123f76a68a42.mockapi.io/api/labs/v1/page_config"
        );
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();

        // Fetch categories
        const fetchedCategories =
          data[0]?.page_config?.find(
            (config) => config.heading === "Featured Health Check-up Packages"
          )?.categories["10386"] || [];

        // Fetch health checkup data
        const fetchedCheckupData =
          data[0]?.page_config?.find(
            (config) => config.heading === "Featured Health Check-up Packages"
          )?.props[0]?.packages || [];

        setCategories(fetchedCategories);
        setCheckupData(fetchedCheckupData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter data by selected category
  const filteredData = checkupData.filter((item) =>
    item.subCategories.includes(selectedCategory.toUpperCase())
  );

  return (
    <div className="health-checkup-container">
      <div className="header">
        <h2>Featured Health Check-ups</h2>
        <button className="view-all-button">View All</button>
      </div>

      {/* Categories */}
      <div className="categories">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-button ${
              selectedCategory === category ? "selected" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Health Checkup Cards */}
      <div className="checkup-list">
        {filteredData.map((checkup) => (
          <div key={checkup.packageId} className="checkup-card">
            <div className="card-header">
              <h3>{checkup.packageDisplayName}</h3>
              <p className="report-time">{checkup.reportsTatText}</p>
            </div>
            <p className="test-count">{checkup.testCount} Tests Included</p>
            <p className="price">
              ₹{checkup.price}{" "}
              <span className="original-price">₹{checkup.priceRange}</span>
            </p>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthCheckupList;
