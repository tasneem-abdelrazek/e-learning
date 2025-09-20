import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BookOpen, Heart, BookmarkPlus, User } from "lucide-react";
import * as coursesActions from "../../store/slices/coursesSlice";

const CardActions = ({ courseData, showHeart = true }) => {
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  
  if (!courseData) return null;

  const handleDetailsClick = () => {
    dispatch(coursesActions.setSelectedCourse(courseData));
  };

  return (
    <div className="flex gap-3 items-end mt-3">
      <div className="flex flex-col items-center">
        <Link
          to={`/details/${courseData.id}`}
          onClick={handleDetailsClick}
          className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors mb-1"
        >
          <BookOpen size={20} className="text-white" />
        </Link>
        <span className="text-xs text-gray-300 font-medium">Details</span>
      </div>

      <div className="flex flex-col items-center">
        <button className="p-2 rounded-full bg-blue-500 hover:bg-blue-400 transition-colors mb-1">
          <User size={20} className="text-white" />
        </button>
        <span className="text-xs text-gray-300 font-medium">Join</span>
      </div>

      <div className="flex flex-col items-center">
        <button className="p-2 rounded-full bg-purple-600 hover:bg-purple-500 transition-colors mb-1">
          <BookmarkPlus size={20} className="text-white" />
        </button>
        <span className="text-xs text-gray-300 font-medium">Wishlist</span>
      </div>

      {showHeart && (
        <div className="flex flex-col items-center">
          <button
            onClick={() => setLiked(!liked)}
            className={`p-2 rounded-full transition-colors mb-1 ${
              liked ? "bg-red-500 hover:bg-red-400" : "bg-pink-600 hover:bg-pink-500"
            }`}
          >
            <Heart size={20} className={`text-white ${liked ? "fill-white" : ""}`} />
          </button>
          <span className="text-xs text-gray-300 font-medium">Favorite</span>
        </div>
      )}
    </div>
  );
};

export default CardActions;