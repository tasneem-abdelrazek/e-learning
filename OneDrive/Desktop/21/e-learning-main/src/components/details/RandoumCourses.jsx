import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/button"; 

const RandoumCourses = ({ courses }) => {
  const navigate = useNavigate();

  if (!courses || courses.length === 0) {
    return <p className="text-gray-500">No courses available right now.</p>;
  }

  const randomCourses = courses.sort(() => 0.5 - Math.random()).slice(0, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {randomCourses.map((course) => (
        <div
          key={course.id}
          className="border border-gray-300 rounded-lg shadow-md p-4 hover:shadow-lg transition"
        >
          {course.imageUrl ? (
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
          ) : (
            <div className="w-full h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
              <span className="text-gray-600">No Image</span>
            </div>
          )}

          <h3 className="text-lg font-bold mb-2">{course.title}</h3>

          <p className="text-sm text-gray-600 mb-3">
            {course.description || "No description available."}
          </p>

          <Button
            text="View Details"
            variant="gradientYellowOrange"
            shape="rounded"
            size="md"
            className="w-full"
            onClick={() => navigate(`/details/${course.id}`)}
          />
        </div>
      ))}
    </div>
  );
};

export default RandoumCourses;
