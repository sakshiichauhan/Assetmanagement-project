import React from 'react';
import assets from '../assets/Card.png';  
 
const CardView = ({ image, title, description, buttonText }) => {
  return (
    <div className="max-w-sm w-full rounded-lg shadow-lg bg-white">
      {/* Card Image */}
      <div>
        <img
          src={image || assets || "https://via.placeholder.com/400x250"}
          alt="card"
          className="w-full h-48 object-cover"
        />
      </div>
 
      {/* Card Content */}
      <div className="p-4">
        <div className="font-semibold text-xl text-gray-800">{title || "Asset Management"}</div>
        <p className="text-gray-600 mt-2">
          {description || "Description of the card goes here."}
        </p>
      </div>
 
      {/* Card Footer */}
      <div className="px-4 py-2 bg-gray-100 text-right">
        <button className="text-blue-600 font-semibold hover:underline">
          {buttonText || "Open"}
        </button>
      </div>
    </div>
  );
};
 
export default CardView;