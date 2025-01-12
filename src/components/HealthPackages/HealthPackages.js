import React, { useEffect, useState } from "react";
import "./HealthPackages.css";

const HealthPackages = () => {
  const [healthPackages, setHealthPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHealthPackages = async () => {
      try {
        const response = await fetch(
          "https://677f757b0476123f76a68a42.mockapi.io/api/labs/v1/page_config"
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();

        // Extract "Lifestyle Health Check-up Packages"
        const lifestylePackages = data[0]?.page_config?.find(
          (config) => config.title === "LifeStyle Health Check Packages"
        )?.props || [];

        setHealthPackages(lifestylePackages);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch health packages.");
        setLoading(false);
      }
    };

    fetchHealthPackages();
  }, []);

  if (loading) return <div className="loading">Loading health packages...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="health-packages-container">
      <h2 className="header">Lifestyle Health Check-up Packages</h2>
      {healthPackages.length === 0 ? (
        <div className="no-data">No health packages available.</div>
      ) : (
        <div className="packages-grid">
          {healthPackages.map((pkg, index) => (
            <div key={index} className="package-card">
              <img
                src={pkg.imgSrc || "https://via.placeholder.com/150"}
                alt={pkg.title}
                className="package-image"
              />
              <h3 className="package-title">{pkg.title}</h3>
              <p className="package-value">{pkg.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HealthPackages;
