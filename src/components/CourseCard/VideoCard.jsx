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
  bottomBg = "bg-gradient-to-r from-[#FFC000] to-[#FF8A00]",
  bottomTextColor = "text-white",
  showHeart = true,
}) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="shadow-none overflow-hidden bg-transparent rounded-b-3xl">
      {/* Video or Image */}
      {(videoUrl || image) && (
        <div className="relative h-52 overflow-hidden rounded-t-none rounded-b-none">
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
              className="w-full h-full object-cover rounded-t-3xl rounded-b-none"
            />
          )}

          {/* Category tag */}
          {category && (
            <div className="absolute top-0 left-0 px-4 py-2 rounded-tl-3xl rounded-br-3xl text-base font-bold bg-gradient-to-r from-green-400 to-green-600 text-white">
              {category}
            </div>
          )}

          {/* Price tag */}
          {price && (
            <div className="absolute top-0 right-0 px-4 py-2 rounded-tr-3xl rounded-bl-3xl text-base font-bold bg-gradient-to-r from-purple-500 to-purple-700 text-white">
              ${price}
            </div>
          )}
        </div>
      )}

      {/* Bottom section */}
      <div className={`${bottomBg} p-3 rounded-b-3xl`}>
        <h3 className={`text-lg font-bold mb-2 ${bottomTextColor}`}>{title}</h3>

        {description && (
          <p className={`text-sm mb-3 ${bottomTextColor} opacity-90`}>{description}</p>
        )}

        <div className="flex flex-wrap gap-2 mb-2 items-center">
          <Link to={`/details/${id}`}>
            <Button text="Details" variant="blackText" shape="square" size="md" />
          </Link>

          <Button text="Join course" variant="blackText" shape="square" size="md" />
          <Button text="Add to wish list" variant="blackText" shape="square" size="md" />

          {showHeart && <HeartButton liked={liked} onToggle={setLiked} size={50} />}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
