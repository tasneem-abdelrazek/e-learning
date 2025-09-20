import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeCourse } from "../../store/slices/dashboardSlice";
import { Play, Trash2, CheckCircle } from "lucide-react";
import DefaultImage from "../../assets/course_not_found_icon.png";

const DashboardCourseCard = ({ courseData }) => {
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);
  if (!courseData) return null;

  const progress = courseData.progress || 0;
  const isCompleted = progress >= 100;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden p-4">
      <div className="relative h-40">
        <img
          src={courseData.imageUrl || DefaultImage}
          alt={courseData.title}
          className="w-full h-full object-cover"
        />
        {isCompleted && (
          <CheckCircle className="absolute bottom-2 right-2 w-6 h-6 text-green-500" />
        )}
      </div>

      <h3 className="font-bold text-lg mt-2">{courseData.title}</h3>

      <div className="w-full bg-gray-200 rounded-full h-2 my-2">
        <div
          className={`h-2 rounded-full ${isCompleted ? "bg-green-500" : "bg-blue-500"}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex gap-2 mt-2">
        <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2">
          <Play className="w-4 h-4" /> {isCompleted ? "Review" : "Continue"}
        </button>
        <button
          onClick={() => setConfirm(true)}
          className="bg-red-50 hover:bg-red-100 text-red-600 py-2 px-4 rounded-lg flex items-center justify-center"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {confirm && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 mb-2">Remove "{courseData.title}"?</p>
          <div className="flex justify-end gap-2">
            <button onClick={() => setConfirm(false)} className="px-3 py-1 bg-gray-200 rounded">Cancel</button>
            <button
              onClick={() => { dispatch(removeCourse(courseData.id)); setConfirm(false); }}
              className="px-3 py-1 bg-red-500 text-white rounded"
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
