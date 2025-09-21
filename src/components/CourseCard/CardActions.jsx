import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BookOpen, Heart, BookmarkPlus, User, UserMinus } from "lucide-react"; // ✅ ضيفنا UserMinus
import * as coursesActions from "../../store/slices/coursesSlice";
import { addJoinedCourse, removeJoinedCourse } from "../../store/slices/joinedCoursesSlice";
import { toggleWishlist } from "../../store/slices/wishlistSlice";
import { toggleFavorite } from "../../store/slices/favoritesSlice";

const CardActions = ({ courseData, showDtails = true, showHeart = true, showRemove = false, showJoin = true, showWishList = true }) => {
  const dispatch = useDispatch();

  // جيب البيانات من الـ store
  const { joinedCourses } = useSelector((state) => state.joinedCourses);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { favorites } = useSelector((state) => state.favorites);

  if (!courseData) return null;

  // Check if course already exists
  const isJoined = joinedCourses.some((c) => c.id === courseData.id);
  const isInWishlist = wishlist.some((c) => c.id === courseData.id);
  const isFavorite = favorites.some((c) => c.id === courseData.id);

  // Handlers
  const handleDetailsClick = () => {
    dispatch(coursesActions.setSelectedCourse(courseData));
  };

  const handleJoin = () => {
    dispatch(addJoinedCourse(courseData));
  };

  const handleRemove = () => {
    dispatch(removeJoinedCourse(courseData.id));
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist(courseData));
  };

  const handleFavorite = () => {
    dispatch(toggleFavorite(courseData));
  };

  return (
    <div className="flex gap-3 items-end mt-3">
      {/* Details */}
      {showDtails && (
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
      )}
      {/* Join */}
      {showJoin && (
        <div className="flex flex-col items-center">
          <button
            onClick={handleJoin}
            disabled={isJoined} // لو متسجل بالفعل يتقفل
            className="p-2 rounded-full bg-blue-500 hover:bg-blue-400 transition-colors mb-1 disabled:bg-gray-400"
          >
            <User size={20} className="text-white" />
          </button>
          <span className="text-xs text-gray-300 font-medium">Join</span>
        </div>
      )}
      {/* Remove */}
      {showRemove && (
        <div className="flex flex-col items-center">
          <button
            onClick={handleRemove}
            disabled={!isJoined}
            className="p-2 rounded-full bg-red-500 hover:bg-red-400 transition-colors mb-1 disabled:bg-gray-400"
          >
            <UserMinus size={20} className="text-white" />
          </button>
          <span className="text-xs text-gray-300 font-medium">Remove</span>
        </div>
      )}
      {/* Wishlist */}
      {showWishList && (
        <div className="flex flex-col items-center">
          <button
            onClick={handleWishlist}
            className={`p-2 rounded-full transition-colors mb-1 ${isInWishlist
              ? "bg-yellow-500 hover:bg-yellow-400"
              : "bg-purple-600 hover:bg-purple-500"
              }`}
          >
            <BookmarkPlus size={20} className="text-white" />
          </button>
          <span className="text-xs text-gray-300 font-medium">
            {isInWishlist ? "In Wishlist" : "Wishlist"}
          </span>
        </div>
      )}
      {/* Favorite */}
      {showHeart && (
        <div className="flex flex-col items-center">
          <button
            onClick={handleFavorite}
            className={`p-2 rounded-full transition-colors mb-1 ${isFavorite
              ? "bg-red-500 hover:bg-red-400"
              : "bg-pink-600 hover:bg-pink-500"
              }`}
          >
            <Heart
              size={20}
              className={`text-white ${isFavorite ? "fill-white" : ""}`}
            />
          </button>
          <span className="text-xs text-gray-300 font-medium">
            {isFavorite ? "Favorited" : "Favorite"}
          </span>
        </div>
      )}
    </div>
  );
};

export default CardActions;