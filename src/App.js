import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import components
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import IconsSection from "./components/Icons/IconsSection";
import Banners from "./components/Banners/Banners";
import HealthCheckupList from "./components/HealthCheckupList/HealthCheckupList";
import HealthPackages from "./components/HealthPackages/HealthPackages";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import FaqSection from "./components/FaqSection/FaqSection";
import TestimonialSection from "./components/TestimonialSection/TestimonialSection";
import AllLabTestsScreen from "./components/LabTestsScreen/AllLabTestsScreen";
import LabVisitsScreen from "./components/LabVisitsScreen/LabVisitsScreen";
import NotFound from "./pages/NotFound";

function App() {
  useEffect(() => {
    console.log("App loaded successfully.");
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Header Component */}
        <Header />

        {/* Routes for Application */}
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <>
                <SearchBar />
                <IconsSection />
                <Banners />
                <HealthCheckupList />
                <HealthPackages />
                <HowItWorks />
                <TestimonialSection />
                <FaqSection />
              </>
            }
          />

          {/* All Lab Tests Route */}
          <Route path="/all-lab-tests" element={<AllLabTestsScreen />} />

          {/* Lab Visits Route */}
          <Route path="/lab-visits" element={<LabVisitsScreen />} />

          {/* 404 - Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
