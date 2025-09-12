import { Link } from "react-router-dom";
import React, { useState } from "react";
import Button from "../button/button";
import HeartButton from "../button/HeartButton";
import { FaHeart, FaRegHeart } from "react-icons/fa";


const VideoCard = ({
  id,
  title,
  videoUrl,
  tag = "",
  tagBgColor = "bg-gradient-to-r from-[#FFC000] to-[#FF8A00]",
  tagTextColor = "text-white",
  bottomBg = "bg-gradient-to-r from-[#FFC000] to-[#FF8A00]",
  bottomTextColor = "text-white",
  roundedTop = "rounded-t-3xl",
  roundedBottom = "rounded-b-2xl",
  buttonText = "Details",
  showHeart = true,
}) => {  const [liked, setLiked] = useState(false);

  return (
    <div className={`bg-white ${roundedTop}`}>
      {videoUrl && (
        <div className={`relative h-64 ${roundedTop} overflow-hidden`}>
          <iframe
            src={videoUrl}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          {tag && (
            <div
              className={`absolute top-0 right-0 px-3 py-2 rounded-tr-none rounded-bl-2xl text-base font-semibold ${tagBgColor} ${tagTextColor}`}
            >
              {tag}
            </div>
          )}
        </div>
      )}

      <div className={`${bottomBg} ${roundedBottom} p-4`}>
        <h3 className={`text-lg font-bold mb-4 ${bottomTextColor}`}>{title}</h3>
        <div className="flex flex-wrap gap-2 mb-2 items-center">
          <Link to={`/details/${id}`}>
            <Button
              text={buttonText}
              variant="white"
              shape="square"
              size="md"
            />
          </Link>

          <Button
            text="Sign Up"
            variant="white"
            shape="square"
            size="md"
          />

          {showHeart && (
            <HeartButton
              size="50"
              liked={liked}           
              onToggle={(val) => setLiked(val)} د
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
