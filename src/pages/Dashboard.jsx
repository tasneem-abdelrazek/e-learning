import React from "react";
import { useSelector, useDispatch } from "react-redux";
import DashboardCard from "../components/dashbord/DashBordCard";
import { removeJoinedCourse } from "../store/slices/joinedCoursesSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  // joincourses
  const courses = useSelector((state) => state.joinedCourses.joinedCourses);

  // Remove
  const handleUnjoin = (courseId) => {
    dispatch(removeJoinedCourse(courseId));
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.length === 0 ? (
        <p className="text-gray-500 text-lg">No joined courses yet.</p>
      ) : (
        courses.map((course) => (
          <DashboardCard
            key={course.id}
            id={course.id}
            title={course.title}
            image={course.image}
            price={course.price}
            category={course.category}
            description={course.description}

            onUnjoin={handleUnjoin}
          />
        ))
      )}
    </div>
  );
};

export default Dashboard;