import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, BookOpen, BookmarkPlus, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { addJoinedCourse } from "../../store/slices/joinedCoursesSlice";
import { toggleWishlist } from "../../store/slices/wishlistSlice";
import { toggleFavorite } from "../../store/slices/favoritesSlice";

const CardActions = ({ id, title, showHeart = true }) => {
  const [liked, setLiked] = useState(false); // UI state for button color
  const dispatch = useDispatch();

  // Favorite Button handler
  const handleClick = () => {
    setLiked(!liked); // change color
    dispatch(toggleFavorite({ id, title })); // update store
  };

  return (
    <div className="flex gap-3 items-end mt-3">
      {/* Details */}
      <div className="flex flex-col items-center">
        <Link
          to={`/details/${id}`}
          className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors mb-1"
        >
          <BookOpen size={20} className="text-white" />
        </Link>
        <span className="text-xs text-gray-300 font-medium">Details</span>
      </div>

      {/* Join Course */}
      <div className="flex flex-col items-center">
        <button
          onClick={() => dispatch(addJoinedCourse({ id, title }))}
          className="p-2 rounded-full bg-blue-500 hover:bg-blue-400 transition-colors mb-1"
        >
          <User size={20} className="text-white" />
        </button>
        <span className="text-xs text-gray-300 font-medium">Join</span>
      </div>

      {/* Wishlist */}
      <div className="flex flex-col items-center">
        <button
          onClick={() => dispatch(toggleWishlist({ id, title }))}
          className="p-2 rounded-full bg-purple-600 hover:bg-purple-500 transition-colors mb-1"
        >
          <BookmarkPlus size={20} className="text-white" />
        </button>
        <span className="text-xs text-gray-300 font-medium">Wishlist</span>
      </div>

      {/* Favorite */}
      {showHeart && (
        <div className="flex flex-col items-center">
          <button
            onClick={handleClick}
            className={`p-2 rounded-full transition-colors mb-1 ${liked
              ? "bg-red-500 hover:bg-red-400"
              : "bg-pink-600 hover:bg-pink-500"
              }`}
          >
            <Heart
              size={20}
              className={`text-white ${liked ? "fill-white" : ""}`}
            />
          </button>
          <span className="text-xs text-gray-300 font-medium">Favorite</span>
        </div>
      )}
    </div>
  );
};

export default CardActions;