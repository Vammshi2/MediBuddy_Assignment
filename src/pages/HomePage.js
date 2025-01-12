import React from 'react';
import DynamicComponent from '../components/DynamicComponent/DynamicComponent';

const HomePage = () => {
  const mockData = [
    // Add your mock data here for testing
  ];

  return (
    <div className="container mx-auto p-4">
      {mockData.map((component) => (
        <DynamicComponent key={component.id} componentData={component} />
      ))}
    </div>
  );
};

export default HomePage;
