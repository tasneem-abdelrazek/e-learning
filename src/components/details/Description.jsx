import React from "react";

const Description = ({ course }) => {
  if (!course) return <p className="text-center mt-4">Loading course details...</p>;

  return (
    <div className="bg-white p-6 flex-1 max-w-lg">
      <h2 className="text-orange-500 text-xl font-bold mb-4 text-center">
        {course.title}
      </h2>
      <p className="text-gray-500 text-sm leading-relaxed text-justify">
        {course.description}
      </p>
    </div>
  );
};

export default Description;
