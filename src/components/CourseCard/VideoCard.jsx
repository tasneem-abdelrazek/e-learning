import React from "react";
import CardActions from "./CardActions";
import DefaultImage from "../../assets/course_not_found_icon.png";

const VideoCard = ({ courseData }) => {
  if (!courseData) return null; // حماية لو الداتا مش موجودة

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-orange-200 via-orange-400 to-orange-400 hover:scale-105 transition-transform duration-300 group w-84 h-96 mx-auto">
      <div className="relative h-60 overflow-hidden rounded-t-2xl">
        <img
          src={courseData.imageUrl || DefaultImage}
          alt={courseData.title || "Untitled"}
          className="w-full h-full object-cover rounded-t-2xl"
        />

        {courseData.category && (
          <div className="absolute top-0 left-0 px-5 py-2 bg-blue-600 text-white font-bold z-10 rounded-tl-2xl rounded-br-2xl">
            {courseData.category}
          </div>
        )}

        {courseData.price != null && (
          <div className="absolute top-0 right-0 px-5 py-2 bg-purple-600 text-white font-bold z-10 rounded-tr-2xl rounded-bl-2xl">
            {courseData.price == 0 ? "Free" : `$${courseData.price}`}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-orange-500/90 to-transparent text-white p-4 transform translate-y-2/3 group-hover:translate-y-0 transition-transform duration-300 h-40">
        <h3 className="text-lg font-bold mb-2 truncate">{courseData.title}</h3>
        <p className="text-sm mb-3 opacity-90 line-clamp-2">{courseData.description}</p>

        <CardActions courseData={courseData} />
      </div>
    </div>
  );
};

export default VideoCard;
