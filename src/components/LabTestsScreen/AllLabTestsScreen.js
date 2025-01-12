import React, { useEffect, useState } from "react";
import "./AllLabTestsScreen.css";

function AllLabTestsScreen() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch("https://677f757b0476123f76a68a42.mockapi.io/api/labs/v1/page_config")
      .then((response) => response.json())
      .then((data) => {
        const packageData = data[0]?.page_config?.find(
          (config) => config.heading === "Featured Health Check-up Packages"
        )?.props[0]?.packages;

        setPackages(packageData || []);
      });
  }, []);

  return (
    <div className="all-lab-tests-screen">
      <h2>All Lab Tests</h2>
      <div className="package-list">
        {packages.map((pkg) => (
          <div key={pkg.packageId} className="package-card">
            <div className="package-header">
              <h3>{pkg.packageName}</h3>
              <span className="cashless-tag">Cashless</span>
            </div>
            <p className="reports-time">{pkg.reportsTatText}</p>
            <div className="package-details">
              <div className="icons">
                {pkg.visitType.includes("HomeVisit") && <span>🏠 Home</span>}
                {pkg.visitType.includes("LabVisit") && <span>🏥 Lab</span>}
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
}

export default AllLabTestsScreen;
