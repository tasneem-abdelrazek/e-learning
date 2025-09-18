import React from "react";
import Button from "../button/button";




const DetailsOfCard = ({ 
  title,
  description,
  category,
  image,
  buttonText = "Read More",
  className = "",
}) => {


  return (
    <div
      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 max-w-2xl mx-auto overflow-hidden ${className}`}
    >
      {/* Image Section */}
      <div className="h-64 md:h-80 w-full bg-gray-300 relative overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-8">
        {category && (
          <div className="bg-gradient-to-r from-[#FFC000] to-[#FF8A00] text-white px-4 py-2 rounded-full text-sm inline-block mb-4 shadow-md">
            {category}
          </div>
        )}

        {title && (
          <h3 className="font-bold mb-4 text-2xl md:text-3xl text-gray-900 leading-snug line-clamp-2">
            {title}
          </h3>
        )}

        {description && (
          <p className="text-gray-700 text-base md:text-lg mb-6 line-clamp-3">
            {description}
          </p>
        )}

        {buttonText && (
          <Button
            text={buttonText}
            variant="gradientYellowOrange"
            shape="rounded"
            size="md"
            className="w-full"
          />
        )}
      </div>
    </div>
  );
};

export default DetailsOfCard;
