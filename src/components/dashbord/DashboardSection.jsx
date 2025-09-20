import React from "react";
import { useSelector } from "react-redux";
import DashboardCourseCard from "./DashboardCourseCard";

const DashboardSection = () => {
  const enrolledCourses = useSelector((state) => state.dashboard.courses || []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Dashboard</h1>

        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map(course => (
              <DashboardCourseCard key={course.id} courseData={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-600">
            <p>No courses yet. Go join some courses!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardSection;
