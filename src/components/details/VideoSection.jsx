import React, { useState } from "react";

const VideoPlayer = ({ videoUrl, title, description }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden w-full max-w-3xl mx-auto">
      {/* Video iframe */}
      <div className="relative aspect-video bg-black">
        {videoUrl ? (
          <iframe
            src={videoUrl}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            Video not available
          </div>
        )}

        {/* Play/Pause Button Overlay */}
        <button
          onClick={handlePlayPause}
          className="absolute inset-0 m-auto w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition"
        >
          {isPlaying ? "⏸" : "▶️"}
        </button>

        {/* Description Overlay */}
        {description && (
          <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded text-sm">
            {description}
          </div>
        )}
      </div>

      {/* Title */}
      {title && <h3 className="text-white text-lg font-semibold p-4">{title}</h3>}
    </div>
  );
};

export default VideoPlayer;
