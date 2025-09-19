import React, { useState } from "react";
import { Play, BookOpen } from "lucide-react";
import Button from "../button/button";
import ConfirmModal from "./ConfirmModal";

const DashboardCard = ({ course = {}, onJoin, onUnjoin }) => {
  const [modal, setModal] = useState({ open: false, type: "" });
  const [isHovered, setIsHovered] = useState(false);

  const handleAction = (type) => setModal({ open: true, type });

  const confirmAction = () => {
    if (course.id) {
      modal.type === "join" && onJoin?.(course.id);
      modal.type === "unjoin" && onUnjoin?.(course.id);
    }
    setModal({ open: false, type: "" });
  };

  const { image, videoUrl, type, title, description, progress = 0 } = course;

  return (
    <div
      className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1 max-w-sm w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image / Video / Default */}
      <div className="relative h-48 bg-gray-200 flex items-center justify-center">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
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
      <div className="p-6 bg-gradient-to-br from-orange-400 to-orange-600 text-white">
        <h3 className="text-lg font-bold mb-2">{title || "Untitled"}</h3>

        {/* Progress */}
        <div className="mb-2">
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
      </div>

      {/* Hover Overlay */}
      {isHovered && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 transition duration-300">
          <h4 className="text-xl font-bold mb-2">{title || "Untitled"}</h4>
          <p className="text-sm text-center px-4 mb-4 opacity-90">{description}</p>
          <div className="flex gap-3">
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
      )}

      {/* Modal */}
      <ConfirmModal
        isOpen={modal.open}
        actionType={modal.type}
        onConfirm={confirmAction}
        onCancel={() => setModal({ open: false, type: "" })}
      />
    </div>
  );
};

export default DashboardCard;