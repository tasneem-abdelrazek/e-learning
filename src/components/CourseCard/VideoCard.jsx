// VideoCard.jsx
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Button from "../button/button";
import HeartButton from "../button/HeartButton";

const VideoCard = ({
  id,
  title,
  videoUrl,
  image = "",
  category = "",
  description = "",
  price = "",
  date = "20 Sep",
  showHeart = true,
  rating = 4.5,
}) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-xl bg-gray-900 transition-transform duration-300 hover:scale-105 hover:shadow-2xl group">
      
      {/* Video or Image */}
      {(videoUrl || image) && (
        <div className="relative h-52 overflow-hidden rounded-t-2xl">
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

          {/* Rating Circle */}
          <div className="absolute top-2 left-2 w-10 h-10 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold shadow-lg z-10">
            {rating}
          </div>

          {/* Category Capsule */}
          {category && (
            <div className="absolute top-2 left-16 px-3 py-1 rounded-full bg-green-500 text-white text-sm font-semibold z-10">
              {category}
            </div>
          )}

          {/* Date Capsule */}
          <div className="absolute top-2 left-36 px-3 py-1 rounded-full bg-gray-700 text-white text-sm font-semibold z-10">
            {date}
          </div>

          {/* Price Capsule */}
          {price && (
            <div className="absolute top-2 right-2 px-3 py-1 rounded-full bg-purple-600 text-white text-sm font-semibold z-10">
              {price}
            </div>
          )}
        </div>
      )}

      {/* Overlay Info */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/90 to-transparent text-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        {description && <p className="text-sm mb-2 opacity-90">{description}</p>}
<div className="flex flex-wrap gap-2 items-center">
  <Link to={`/details/${id}`}>
    <Button text="Details" variant="red" shape="rounded" size="md" />
  </Link>
  <Button text="Join course" variant="gradientOrange" shape="rounded" size="md" />
  <Button text="Add to wish list" variant="gradientOrange" shape="rounded" size="md" />
  {showHeart && <HeartButton liked={liked} onToggle={setLiked} size={50} />}
</div>

      </div>
    </div>
  );
};

export default VideoCard;
