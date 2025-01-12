// import React from "react";
// import "./LabCard.css";

// const LabCard = ({ labName, location, nextSlot, rating, ratingCount, imageUri }) => {
//   return (
//     <div className="lab-card-container">
//       <img src={imageUri} alt={`${labName} background`} className="lab-background-image" />
//       <div className="lab-info-container">
//         <h2 className="lab-name">{labName}</h2>
//         <div className="details-container">
//           <div className="location-container">
//             <img
//               src="http://b.io/location-icon"
//               alt="Location icon"
//               className="icon-small"
//             />
//             <span className="location-text">{location}</span>
//           </div>
//           <div className="slot-container">
//             <img src="http://b.io/clock-icon" alt="Clock icon" className="icon-small" />
//             <span className="slot-text">Next Slot - {nextSlot}</span>
//           </div>
//         </div>
//         <div className="rating-container">
//           <span className="rating-text">{`${rating}/5 (${ratingCount} ratings)`}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LabCard;


import React from "react";
import "./LabCard.css";

const LabCard = ({ labName, location, nextSlot, rating, ratingCount, imageUri }) => {
  return (
    <div className="lab-card">
      <img className="lab-image" src={imageUri} alt={labName} />
      <div className="lab-details">
        <h2 className="lab-name">{labName}</h2>
        <p className="lab-location">{location}</p>
        <p className="lab-slot">Next Slot: {nextSlot}</p>
        <div className="lab-rating">
          <span>⭐ {rating}</span>
          <span>({ratingCount} ratings)</span>
        </div>
      </div>
    </div>
  );
};

export default LabCard;
