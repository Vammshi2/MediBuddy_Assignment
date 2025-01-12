import React, { useState, useEffect } from "react";
import "./SearchBar.css";

const SearchBar = () => {
  const [placeholder, setPlaceholder] = useState("Find lab tests, diagnostics centres");

  useEffect(() => {
    const fetchSearchPlaceholder = async () => {
      try {
        const response = await fetch(
          "https://677f757b0476123f76a68a42.mockapi.io/api/labs/v1/page_config"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Dynamically set the placeholder if the API provides it
        const searchConfig = data?.page_config?.find(
          (config) => config.title.toLowerCase() === "search"
        );

        const placeholderText =
          searchConfig?.props?.placeholder || "Find lab tests, diagnostics centres";

        setPlaceholder(placeholderText);
      } catch (error) {
        console.error("Error fetching search placeholder:", error);
        setPlaceholder("Find lab tests, diagnostics centres"); // Fallback in case of error
      }
    };

    fetchSearchPlaceholder();
  }, []);

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-bar-input"
        placeholder={placeholder}
      />
      <button className="search-bar-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="search-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m-5.15 1.85a7 7 0 100-14 7 7 0 000 14z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
