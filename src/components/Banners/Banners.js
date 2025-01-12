import React, { useState, useEffect } from "react";
import "./Banners.css";

const BannersSection = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // For slideshow

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(
          "https://677f757b0476123f76a68a42.mockapi.io/api/labs/v1/page_config"
        );
        const data = await response.json();

        // Extracting the "Banners" section from the API response
        const bannersData = data?.[0]?.page_config?.find(
          (config) => config.title === "Banners"
        )?.props;

        if (bannersData) {
          // Adding the static banner to the banners list
          const staticBanner = {
            bannerUrl:
              "https://s3-alpha-sig.figma.com/img/3052/fb58/9235d0f4d984a3789adf549082b7d8c9?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EYi2s6aFqeFq-ITOYaysvuV1BHpEElTZfNWXTauhdBBj-dPnuz-5t-K0VU7OKuhw855Va2Jg-TLs4JoHSM16CYR0je0hjXjV3xGeoZ6SowHICoBp2xhaYgiCJvTZgMwrCTf4cEQ3JlvgO-RixFaIoc0bWo0Vis4P8FjNQ8766mpa-FlIyciBm-L~xEISP7DtdpWs8WpQUf9rNRShJxOAB4jS7nwMSYTDZ3SBFIlsN2cMnSWrRTK6Cgo4nyK3zVSp3bhq-SJR~BK-Z-wfpqL65fMlLoFnyfQQqy~DbEly8fmZ866C54kKc716lFpXjQJx66v2CzTaZBITqLl~XuBTPw__",
            title: "Baby On Board? Get Pregnancy Care Tests!",
            subtitle: "Diabetes, ANC, Ferritin, HIV/Elisa & Thyroid",
            deeplink: "https://example.com", // Replace with your actual URL
          };
          setBanners([...bannersData, staticBanner]);
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        banners.length > 0 ? (prevIndex + 1) % banners.length : 0
      );
    }, 3000); // Change banners every 3 seconds

    return () => clearInterval(interval);
  }, [banners]);

  if (banners.length === 0) {
    return null; // Render nothing if there are no banners
  }

  const currentBanner = banners[currentIndex];

  return (
    <div className="banners-container">
      {currentBanner.deeplink ? (
        <a
          href={currentBanner.deeplink}
          target="_blank"
          rel="noopener noreferrer"
          className="banner-item"
          style={{
            backgroundImage: currentBanner.bannerUrl
              ? `url(${currentBanner.bannerUrl})`
              : "none",
            backgroundColor: currentBanner.bannerUrl ? "transparent" : "#FDE9F7",
          }}
        >
          <div className="banner-overlay">
            <div className="banner-content">
              {currentBanner.title && (
                <h3 className="banner-title">{currentBanner.title}</h3>
              )}
              {currentBanner.subtitle && (
                <p className="banner-subtitle">{currentBanner.subtitle}</p>
              )}
            </div>
          </div>
        </a>
      ) : (
        <div
          className="banner-item"
          style={{
            backgroundImage: currentBanner.bannerUrl
              ? `url(${currentBanner.bannerUrl})`
              : "none",
            backgroundColor: currentBanner.bannerUrl ? "transparent" : "#FDE9F7",
          }}
        >
          <div className="banner-overlay">
            <div className="banner-content">
              {currentBanner.title && (
                <h3 className="banner-title">{currentBanner.title}</h3>
              )}
              {currentBanner.subtitle && (
                <p className="banner-subtitle">{currentBanner.subtitle}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannersSection;
