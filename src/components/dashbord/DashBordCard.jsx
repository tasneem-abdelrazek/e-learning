import React, { useState } from "react";
import { Play, BookOpen } from "lucide-react";
import Button from "../button/button";
import ConfirmModal from "./ConfirmModal";

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


  const dummyCourse = {
    id: 1,
    title: course.title || "React Basics",
    description:
      course.description ||
      "Learn the basics of React including components, hooks, and state management.",
    type: course.type || "Free",
    progress: course.progress ?? 50,
    image: course.image || "",
    videoUrl: course.videoUrl || "",
  };

  return (
    <div className="flex flex-col items-center gap-2 max-w-sm w-full">
  
      <div
        className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Course Image or Video */}
        <div className="relative h-48 bg-gray-200">
          {dummyCourse.image ? (
            <img
              src={dummyCourse.image}
              alt={dummyCourse.title}
              className="w-full h-full object-cover"
            />
          ) : dummyCourse.videoUrl ? (
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
                dummyCourse.type === "Free"
                  ? "bg-orange-500 text-white"
                  : "bg-purple-600 text-white"
              }`}
            >
              {dummyCourse.type}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 bg-gradient-to-br from-orange-400 to-orange-600 text-white">
          <h3 className="text-lg font-bold mb-2 leading-tight">{dummyCourse.title}</h3>
          <div className="mb-4">
            <span className="text-sm opacity-90">{dummyCourse.progress}% Complete</span>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-2 mt-1">
              <div
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${dummyCourse.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 flex flex-col justify-center items-center transition-all duration-300 bg-white bg-opacity-10 p-4">
            <h4 className="text-xl font-bold mb-4 text-black">{dummyCourse.title}</h4>
            <p className="text-sm text-center mb-6 text-black">{dummyCourse.description}</p>
            <div className="flex space-x-3">
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

     
      <Button
        text="Details"
        variant="blackText"
        shape="square"
        size="md"
        onClick={() => console.log("Details clicked")}
      />
    </div>
  );
};

export default DashboardCard;
