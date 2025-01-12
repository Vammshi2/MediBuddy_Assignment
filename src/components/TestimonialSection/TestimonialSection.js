import React, { useEffect, useState } from "react";
import "./TestimonialSection.css";

const TestimonialSection = () => {
  const [testimonialData, setTestimonialData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(
          "https://677f757b0476123f76a68a42.mockapi.io/api/labs/v1/page_config"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch testimonials.");
        }

        const data = await response.json();

        // Extract testimonials from the correct section
        const fetchedTestimonials =
          data[0]?.page_config?.find(
            (config) => config.title === "What our Users say"
          )?.props || [];

        setTestimonialData(fetchedTestimonials);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Failed to load testimonials.");
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) return <div className="loading">Loading testimonials...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="testimonial-section">
      <h2 className="testimonial-header">What Our Users Say</h2>
      <div className="testimonial-grid">
        {testimonialData.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <p className="testimonial-message">"{testimonial.content}"</p>
            <div className="author-info">
              <p className="author-name">{testimonial.name}</p>
              <p className="author-location">{testimonial.location}</p>
              <p className="testimonial-date">{testimonial.days}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;
