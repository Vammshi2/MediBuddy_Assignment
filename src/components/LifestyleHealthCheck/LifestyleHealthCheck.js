import React from 'react';

const LifestyleHealthCheck = ({ title, props }) => (
  <div className="my-6">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {props.map((item) => (
        <div key={item.value} className="text-center">
          <img
            src={item.imgSrc}
            alt={item.title}
            className="w-16 h-16 mx-auto mb-2"
          />
          <p className="text-sm font-semibold">{item.title}</p>
        </div>
      ))}
    </div>
  </div>
);

export default LifestyleHealthCheck;
