import React, { useState } from "react";
import { Play, BookOpen } from "lucide-react";
import { useDispatch } from "react-redux";
import Button from "../button/button";
import ConfirmModal from "./ConfirmModal";
import {
  updateProgress,
  removeJoinedCourse,
} from "../../store/slices/joinedCoursesSlice";

const DashboardCard = ({ course = {} }) => {
  const [modal, setModal] = useState({ open: false, type: "" });
  const dispatch = useDispatch();

  const handleAction = (type) => setModal({ open: true, type });

  const confirmAction = () => {
    if (course.id) {
      if (modal.type === "join") {
        // progress
        dispatch(
          updateProgress({
            id: course.id,
            progress: (course.progress || 0) + 10,
          })
        );
      } else if (modal.type === "unjoin") {
        dispatch(removeJoinedCourse(course.id));
      }
    }
    setModal({ open: false, type: "" });
  };

  const { imageUrl, videoUrl, type, title, description, progress = 0 } = course;

  return (
    <div className=" justify-center mx-auto max-w-6xl">
      <div className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 hover:scale-105 max-w-sm w-full">
        {/* Image / Video / Default */}
        <div className="relative h-64 bg-gray-200 flex items-center justify-center">
          {imageUrl ? (
            <img src={course.imageUrl} alt={title} className="w-full h-full object-cover" />
          ) : videoUrl ? (
            <Play className="w-16 h-16 text-white opacity-80" />
          ) : (
            <BookOpen className="w-16 h-16 text-gray-600" />
          )}

          {/* Type Badge */}
          <span
            className={`absolute top-3 right-3 px-3 py-1 text-sm font-semibold rounded-full ${type === "Free" ? "bg-orange-500" : "bg-purple-600"
              } text-white`}
          >
            {type || "N/A"}
          </span>
        </div>

        {/* Content */}
        <div className="p-1 bg-gradient-to-br from-orange-400 to-orange-600 text-white">
          <h3 className="text-lg font-bold mb-1">{title || "Untitled"}</h3>
          <p className="text-xs mb-2 opacity-90">{description}</p>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex justify-between mb-2 text-sm opacity-90">
              <span>{progress}% Complete</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-4">
            <Button
              text="Continue Learning"
              variant="white"
              shape="rounded"
              onClick={() => handleAction("join")}
            />
            <Button
              text="Remove"
              variant="white"
              shape="rounded"
              onClick={() => handleAction("unjoin")}
            />
          </div>
        </div>

        {/* Modal */}
        <ConfirmModal
          isOpen={modal.open}
          actionType={modal.type}
          onConfirm={confirmAction}
          onCancel={() => setModal({ open: false, type: "" })}
        />
      </div>
    </div>

  );
};

export default DashboardCard;