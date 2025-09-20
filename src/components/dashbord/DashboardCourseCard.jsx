// src/components/dashbord/DashboardCourseCard.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeCourse, updateCourseStatus } from "../../store/slices/dashboardSlice";
import { Play, Trash2, X } from "lucide-react";
import DefaultImage from "../../assets/course_not_found_icon.png";

const DashboardCourseCard = ({ courseData }) => {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  if (!courseData) return null;

  const handleRemoveCourse = () => {
    dispatch(removeCourse(courseData.id));
    setShowConfirm(false);
  };

  const handleContinueCourse = () => {
    dispatch(updateCourseStatus({ id: courseData.id, status: "in-progress" }));
  };

  const status = courseData.status || "";

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100 relative">
      {/* صورة الكورس */}
      <img
        src={courseData.imageUrl || DefaultImage}
        alt={courseData.title}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />

      {status && (
        <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded font-bold">
          {status === "in-progress" ? "In Progress" : status}
        </div>
      )}

      <h3 className="font-bold text-lg mb-2">{courseData.title}</h3>

      {/* Continue و Remove */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleContinueCourse}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4" />
          Continue
        </button>

        <button
          onClick={() => setShowConfirm(true)}
          className="bg-red-50 hover:bg-red-100 text-red-600 py-2 px-4 rounded-lg flex items-center justify-center gap-1"
        >
          <Trash2 className="w-4 h-4" />
          Remove
        </button>
      </div>

      {/* Modal التحذيري داخل الكارد بدون خلفية سوداء */}
      {showConfirm && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-xl p-4 shadow-lg w-72 z-10">
          <button
            onClick={() => setShowConfirm(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
          <h2 className="text-md font-bold mb-2">Confirm Removal</h2>
          <p className="text-sm mb-4">Are you sure you want to remove <strong>{courseData.title}</strong>?</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowConfirm(false)}
              className="bg-gray-200 hover:bg-gray-300 py-1 px-3 rounded-lg text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleRemoveCourse}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg text-sm"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardCourseCard;
