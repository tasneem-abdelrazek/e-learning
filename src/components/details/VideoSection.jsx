import React, { useState } from "react";

const VideoPlayer = ({ videoUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 rounded-lg text-center 
                    bg-gradient-to-r from-[#FFC000] to-[#FF8A00] text-white 
                    py-20 sm:py-28">
      {videoUrl ? (
        <iframe
          src={videoUrl}
          title={title}
          className="w-full h-64 md:h-96 rounded"
          allowFullScreen
        ></iframe>
      ) : (
        <div className="py-20">Video not available</div>
      )}

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="mt-6 px-6 py-2 bg-white text-gray-900 font-semibold rounded hover:bg-gray-200 transition"
      >
        {isPlaying ? "⏸ Pause" : "▶️ Play"}
      </button>

      {title && <h3 className="text-white text-lg font-semibold mt-6">{title}</h3>}
    </div>
  );
};

export default VideoPlayer;
