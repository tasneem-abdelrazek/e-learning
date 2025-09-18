import { Link } from "react-router-dom";
import React from "react";
import CardActions from "./CardActions"; 

const VideoCard = ({
  id = "1",
  title = "Web Development Course",
  videoUrl,
  image = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
  category = "Programming",
  description = "Learn the fundamentals of web development",
  price = "99",
  showHeart = true,
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-xl shadow-white bg-gradient-to-br from-orange-200 via-orange-400 to-orange-400 transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white group w-84 h-96 mx-auto">
      
      {/* Video or Image */}
      {(videoUrl || image) && (
        <div className="relative h-60 overflow-hidden rounded-t-2xl">
          {videoUrl ? (
            <iframe
              src={videoUrl}
              title={title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover rounded-t-2xl"
            />
          )}

          {/* Category Capsule */}
          {category && (
            <div className="absolute top-0 left-0 px-5 py-2 bg-blue-600 text-white text-lg font-bold z-10 rounded-tl-2xl rounded-br-2xl">
              {category}
            </div>
          )}

          {/* Price Capsule */}
          {price && (
            <div className="absolute top-0 right-0 px-5 py-2 bg-purple-600 text-white text-lg font-bold z-10 rounded-tr-2xl rounded-bl-2xl">
              {price}
            </div>
          )}
        </div>
      )}

      {/* Overlay Info */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-orange-500/90 to-transparent text-white p-4 transform translate-y-2/3 group-hover:translate-y-0 transition-transform duration-300 h-40">
        <h3 className="text-lg font-bold mb-2 truncate">{title}</h3>
        {description && (
          <p className="text-sm mb-3 opacity-90 line-clamp-2">{description}</p>
        )}

        <CardActions id={id} showHeart={showHeart} />
      </div>
    </div>
  );
};

export default VideoCard;
