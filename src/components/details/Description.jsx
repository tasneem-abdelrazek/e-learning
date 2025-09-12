import React from "react";

const Description = () => {
  return (
    <div className="bg-white p-6 flex-1 max-w-lg">
      {/* Title */}
      <h2 className="text-orange-500 text-xl font-bold mb-4 text-center">
        Description
      </h2>

      {/* Content */}
      <p className="text-gray-500 text-sm leading-relaxed text-justify">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis magnam
        eligendi ipsum quasi, labore perferendis. Similique quaerat blanditiis
        sint, beatae nobis, libero illo fugiat temporibus, dolore consectetur
        perferendis facilis nulla.
      </p>
    </div>
  );
};

export default Description;
