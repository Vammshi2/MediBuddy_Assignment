import React, { useEffect, useState } from 'react';
import './BookingCard.css';

const BookingCard = () => {
  const [healthCheckProps, setHealthCheckProps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHealthCheckProps = async () => {
      try {
        const response = await fetch(
          'https://677f757b0476123f76a68a42.mockapi.io/api/labs/v1/page_config'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        // Extract the data for "Book Health Check Packages in Bengaluru"
        const healthCheckData =
          data.find((item) => item.title === 'Book Health Check Packages in Bengaluru')?.props || [];

        setHealthCheckProps(healthCheckData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      }
    };

    fetchHealthCheckProps();
  }, []);

  return (
    <div className="booking-card-container">
      <div className="booking-header">
        <h2>Health Check Packages in Bengaluru</h2>
      </div>
      {loading ? (
        <p className="loading">Loading packages...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : healthCheckProps.length > 0 ? (
        healthCheckProps.map((item, index) => (
          <div className="active-booking-card" key={index}>
            <div className="card-left">
              <img
                src={item.imgSrc || 'https://via.placeholder.com/50'}
                alt={item.label}
                className="avatar"
              />
            </div>
            <div className="card-middle">
              <p className="label" style={{ color: item.color }}>
                {item.label}
              </p>
              <p className="value">Value: {item.value}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="no-data">No health check packages available.</p>
      )}
    </div>
  );
};

export default BookingCard;
