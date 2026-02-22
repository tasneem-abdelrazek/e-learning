import React from "react";
import { useSelector } from "react-redux";
import DashboardCard from "../components/dashbord/DashBordCard";

const Dashboard = () => {

  const courses = useSelector((state) => state.joinedCourses.joinedCourses);
  console.log(courses)
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.length > 0 ? (
        courses.map((course) =>
          <DashboardCard key={course.id} course={course} />)
      ) : (
        <p className="text-center text-gray-600 col-span-3">
          nojoinedCuorses
        </p>
      )}
    </div>
  );
};

export default Dashboard;