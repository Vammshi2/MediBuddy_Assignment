import React, { useEffect, useState } from "react";
import "./LabVisitsScreen.css";
import LabCard from "./LabCard";

const LabVisitsScreen = () => {
  const [labs, setLabs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await fetch(
          "https://677f757b0476123f76a68a42.mockapi.io/api/labs/v1/page_config"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        // Debug the actual API response
        console.log("API Response:", data);

        // Extract lab data from API
        const iconsConfig =
          data[0]?.page_config?.find((config) => config.title === "Icons")
            ?.props || [];

        // If no data is found, throw an error
        if (!iconsConfig.length) {
          throw new Error("No lab-related data available.");
        }

        setLabs(iconsConfig);
      } catch (err) {
        console.error("Error fetching labs:", err);
        setError(err.message || "Failed to fetch labs.");
      }
    };

    fetchLabs();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="lab-visits-container">
      <div className="header-container">
        <h1 className="header-title">Labs Visited</h1>
        <button className="see-all-button">See All</button>
      </div>
      <div className="lab-cards-container">
        {labs.map((lab, index) => (
          <LabCard
            key={index}
            labName={lab.iconText || "Lab Name"}
            location={lab.deeplink || "Location URL"}
            nextSlot="07:30 AM, Tomorrow"
            rating={4.5}
            ratingCount={100}
            imageUri={lab.iconUrl || "https://via.placeholder.com/150"}
          />
        ))}
      </div>
    </div>
  );
};

export default LabVisitsScreen;
