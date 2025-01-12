import React, { useEffect, useState } from "react";
import "./FaqSection.css";

const FaqSection = () => {
  const [faqItems, setFaqItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(
          "https://677f757b0476123f76a68a42.mockapi.io/api/labs/v1/page_config"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        // Extract FAQs from the correct section
        const fetchedFaqs =
          data[0]?.page_config?.find(
            (config) => config.title === "Frequently Asked Questions"
          )?.props || [];

        setFaqItems(fetchedFaqs);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load FAQs.");
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  if (loading) return <div className="loading">Loading FAQs...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="faq-section">
      <h2 className="faq-header">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqItems.map((faq, index) => (
          <div key={index} className="faq-item">
            <h3 className="faq-question">{faq.question || "No question provided"}</h3>
            {faq.answer && <p className="faq-answer">{faq.answer}</p>}
            {faq.points?.length > 0 && (
              <ul className="faq-points">
                {faq.points.map((point, idx) => (
                  <li key={idx}>{point.pnt}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
