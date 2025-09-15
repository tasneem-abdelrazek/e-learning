import React, { useState } from "react";
import { Play, BookOpen } from "lucide-react";
import Button from "../components/button/button";
import ConfirmModal from "../components/dashbord/ConfirmModal";

const DashboardCard = ({ course = {}, onJoin, onUnjoin }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");

  const openModal = (type) => {
    setActionType(type);
    setModalOpen(true);
  };

  const confirmAction = () => {
    if (actionType === "join" && course.id) onJoin?.(course.id);
    if (actionType === "unjoin" && course.id) onUnjoin?.(course.id);
    setModalOpen(false);
  };

  return (
    <div
      className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 max-w-sm w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Course Image or Video */}
      <div className="relative h-48 bg-gray-200">
        {course?.image ? (
          <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
        ) : course?.videoUrl ? (
          <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
            <Play className="w-16 h-16 text-white opacity-80" />
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-gray-600" />
          </div>
        )}

        {/* Course Type Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 text-sm font-semibold rounded-full ${
              course?.type === "Free" ? "bg-orange-500 text-white" : "bg-purple-600 text-white"
            }`}
          >
            {course?.type || "N/A"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-gradient-to-br from-orange-400 to-orange-600 text-white">
        <h3 className="text-lg font-bold mb-2 leading-tight">{course?.title || "Untitled"}</h3>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm opacity-90">{course?.progress ?? 0}% Complete</span>
          </div>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
            <div
              className="bg-white rounded-full h-2 transition-all duration-300"
              style={{ width: `${course?.progress ?? 0}%` }}
            />
          </div>
        </div>

        {/* Removed Continue Button */}
      </div>

  
      {isHovered && (
        <div className="absolute inset-0 flex flex-col justify-center items-center transition-all duration-300 pointer-events-none">
          <h4 className="text-xl font-bold mb-4 pointer-events-auto">{course?.title || "Untitled"}</h4>
          <p className="text-sm text-center px-4 mb-6 opacity-90 pointer-events-auto">{course?.description || ""}</p>
          <div className="flex space-x-3 pointer-events-auto">
            <Button
              text="Continue Learning"
              variant="greenSpecial"
              shape="rounded"
              size="md"
              onClick={() => openModal("join")}
            />
            <Button
              text="Remove"
              variant="redSpecial"
              shape="rounded"
              size="md"
              onClick={() => openModal("unjoin")}
            />
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={modalOpen}
        actionType={actionType}
        onConfirm={confirmAction}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
};

export default DashboardCard;
