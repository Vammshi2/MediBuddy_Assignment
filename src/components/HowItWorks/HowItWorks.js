import React, { useEffect, useState } from "react";
import "./HowItWorks.css";

const HowItWorks = () => {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const response = await fetch(
          "https://677f757b0476123f76a68a42.mockapi.io/api/labs/v1/page_config"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }

        const data = await response.json();

        // Extracting "How It Works" steps from the response
        const howItWorksData =
          data[0]?.page_config?.find(
            (config) => config.title === "How It Works"
          )?.props || [];

        setSteps(howItWorksData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSteps();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (steps.length === 0) {
    return <div className="no-data">No steps available.</div>;
  }

  return (
    <div className="how-it-works-container">
      <h2 className="title">How It Works</h2>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div className="step-item" key={index}>
            <img
              src={step.img || "https://via.placeholder.com/100"}
              alt={step.title || "Step"}
              className="step-icon"
            />
            <div className="step-description">
              <h3 className="step-title">{step.title || "Step Title"}</h3>
              <p className="step-subtitle">{step.subTitle || "Subtitle"}</p>
              <p className="step-text">{step.subText || "Description"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
