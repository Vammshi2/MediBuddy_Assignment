import React, { useState, useEffect } from "react";
import "./Icons.css";

const IconsSection = () => {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const response = await fetch(
          "https://677f757b0476123f76a68a42.mockapi.io/api/labs/v1/page_config"
        );
        const data = await response.json();

        // Extracting the "Icons" section from the API response
        const iconsData = data?.[0]?.page_config?.find(
          (config) => config.title === "Icons"
        )?.props;

        if (Array.isArray(iconsData)) {
          setIcons(iconsData);
        } else {
          console.warn("Icons data not found or invalid format.");
        }
      } catch (error) {
        console.error("Error fetching icons:", error);
      }
    };

    fetchIcons();
  }, []);

  // Fill remaining slots to ensure each row has 3 items
  const paddedIcons = [...icons];
  while (paddedIcons.length % 3 !== 0) {
    paddedIcons.push({}); // Add empty items
  }

  return (
    <div className="icons-container">
      {paddedIcons.map((icon, index) => (
        <div key={index} className="icon-box">
          {icon.iconUrl ? (
            <>
              <img
                src={icon.iconUrl}
                alt={icon.iconText || "Icon"}
                className="icon-image"
              />
              <p className="icon-text">{icon.iconText || ""}</p>
            </>
          ) : (
            <div className="icon-placeholder"></div> // Placeholder for empty slots
          )}
        </div>
      ))}
    </div>
  );
};

export default IconsSection;
