import React from "react";
import { User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addCourse } from "../../store/slices/dashboardSlice";

const JoinButton = ({ courseData }) => {
  const dispatch = useDispatch();
  const enrolledCourses = useSelector((state) => state.dashboard.courses);

  const isEnrolled = enrolledCourses.some((c) => c.id === courseData.id);

  const handleJoinClick = () => {
    if (!isEnrolled) {
      dispatch(addCourse(courseData));
     
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleJoinClick}
        disabled={isEnrolled}
        className={`p-2 rounded-full transition-colors mb-1 ${
          isEnrolled ? "bg-green-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-400"
        }`}
      >
        <User size={20} className="text-white" />
      </button>
      <span className={`text-xs font-medium ${
        isEnrolled ? "text-green-500" : "text-gray-300"
      }`}>
        {isEnrolled ? "Enrolled" : "Join"}
      </span>
    </div>
  );
};

export default JoinButton;
