import React, { useState } from "react";
import Button from "../button/button";
import ConfirmModal from "./ConfirmModal";

const DashboardCard = ({ course, onJoin, onUnjoin }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [imageError, setImageError] = useState(false);

  const openModal = (type) => {
    setActionType(type);
    setModalOpen(true);
  };

  const confirmAction = () => {
    if (actionType === "join") onJoin(course.id);
    if (actionType === "unjoin") onUnjoin(course.id);
    setModalOpen(false);
  };

  const cancelAction = () => setModalOpen(false);

  return (
    <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden w-full max-w-xs transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      {/* Media section */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-blue-50 to-amber-50">
        {course.videoUrl ? (
          <div className="w-full h-full">
            <iframe
              src={course.videoUrl}
              title={course.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <div className="bg-white bg-opacity-80 rounded-full p-2 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        ) : course.image && !imageError ? (
          <div className="w-full h-full relative">
            <img
              src={course.image}
              alt={course.title || "Course"}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-sm font-medium">No media available</span>
          </div>
        )}
        
        {/* Course type badge */}
        <div className="absolute top-3 right-3">
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold shadow-md ${
            course.type === "Premium" 
              ? "bg-amber-300 text-amber-900" 
              : "bg-blue-100 text-blue-800"
          }`}>
            {course.type}
          </span>
        </div>
        
        {/* Progress bar for enrolled courses */}
        {course.progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-70 text-white p-2">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-teal-500 h-2 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Content section */}
      <div className="bg-gradient-to-r from-[#FFC000] to-[#FF8A00] p-4 rounded-b-3xl">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{course.title || "Course Title"}</h3>
        {course.description && (
          <p className="text-sm text-white opacity-90 mb-3 line-clamp-2">{course.description}</p>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 flex-wrap">
          <Button 
            text="Join" 
            variant="greenSpecial" 
            shape="rounded" 
            size="sm" 
            onClick={() => openModal("join")} 
            className="flex-1 transition-all duration-300 hover:scale-105"
          />
          <Button 
            text="Unjoin" 
            variant="redSpecial" 
            shape="rounded" 
            size="sm" 
            onClick={() => openModal("unjoin")} 
            className="flex-1 transition-all duration-300 hover:scale-105"
          />
        </div>
      </div>

      {/* Separated ConfirmModal Component */}
      <ConfirmModal 
        isOpen={modalOpen}
        actionType={actionType}
        onConfirm={confirmAction}
        onCancel={cancelAction}
      />
    </div>
  );
};

export default DashboardCard;