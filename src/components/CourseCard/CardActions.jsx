import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BookOpen, BookmarkPlus, User, UserMinus } from "lucide-react";
import * as coursesActions from "../../store/slices/coursesSlice";
import { addJoinedCourse, removeJoinedCourse } from "../../store/slices/joinedCoursesSlice";



const CardActions = ({ courseData, showDtails = true, showRemove = false, showJoin = true }) => {
  const dispatch = useDispatch();

  const { joinedCourses } = useSelector((state) => state.joinedCourses);


  if (!courseData) return null;

  const isJoined = joinedCourses.some((c) => c.id === courseData.id);


  const handleDetailsClick = () => {
    dispatch(coursesActions.setSelectedCourse(courseData));
  };

  const handleJoin = () => {
    dispatch(addJoinedCourse(courseData));
  };

  const handleRemove = () => {
    dispatch(removeJoinedCourse(courseData.id));
  };



  return (
    <div className="flex gap-3 items-end mt-3">
      {/* Details */}
      {showDtails && (
        <div className="flex flex-col items-center">
          <Link
            to={`/details/${courseData.id}`}
            onClick={handleDetailsClick}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors mb-1"
          >
            <BookOpen size={20} className="text-white" />
          </Link>
          <span className="text-xs text-gray-300 font-medium">Details</span>
        </div>
      )}

      {/* Join */}
      {showJoin && (
        <div className="flex flex-col items-center">
          <button
            onClick={handleJoin}
            disabled={isJoined}
            className="p-2 rounded-full bg-blue-500 hover:bg-blue-400 transition-colors mb-1 disabled:bg-gray-400"
          >
            <User size={20} className="text-white" />
          </button>
          <span className="text-xs text-gray-300 font-medium">Join</span>
        </div>
      )}

      {/* Remove */}
      {showRemove && (
        <div className="flex flex-col items-center">
          <button
            onClick={handleRemove}
            disabled={!isJoined}
            className="p-2 rounded-full bg-red-500 hover:bg-red-400 transition-colors mb-1 disabled:bg-gray-400"
          >
            <UserMinus size={20} className="text-white" />
          </button>
          <span className="text-xs text-gray-300 font-medium">Remove</span>
        </div>
      )}






    </div>
  );
};

export default CardActions;