import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // ← إضافة المكتبات المفقودة
import { BookOpen, Heart, BookmarkPlus } from "lucide-react";
import * as coursesActions from "../../store/slices/coursesSlice";
import { toggleFavorite } from "../../store/slices/favoritesSlice";
import { toggleWishlist } from "../../store/slices/wishlistSlice";
import JoinButton from "../dashbord/JoinButton"; // تعديل المسار

const CardActions = ({ courseData, showHeart = true, showOnly = [] }) => {
  const favorites = useSelector((state) => state.favorites.favorites);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();

  if (!courseData) return null;

  const isLiked = favorites.some((course) => course.id === courseData.id);
  const isInWishlist = wishlist.some((course) => course.id === courseData.id);

  const handleDetailsClick = () => {
    dispatch(coursesActions.setSelectedCourse(courseData));
  };

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(courseData));
  };

  const shouldShowAll = showOnly.length === 0;
  const shouldShowDetails = shouldShowAll || showOnly.includes('details');
  const shouldShowWishlist = shouldShowAll || showOnly.includes('wishlist');
  const shouldShowFavorite = (shouldShowAll || showOnly.includes('favorite')) && showHeart;

  return (
    <div className="flex gap-3 items-end mt-3">
      {shouldShowDetails && (
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

      {showOnly.length === 0 || showOnly.includes("join") ? (
        <JoinButton courseData={courseData} />
      ) : null}

      {shouldShowWishlist && (
        <div className="flex flex-col items-center">
          <button 
            onClick={() => dispatch(toggleWishlist(courseData))}
            className={`p-2 rounded-full transition-colors mb-1 ${
              isInWishlist ? "bg-purple-700 hover:bg-purple-600" : "bg-purple-600 hover:bg-purple-500"
            }`}
          >
            <BookmarkPlus size={20} className={`text-white ${isInWishlist ? "fill-white" : ""}`} />
          </button>
          <span className="text-xs text-gray-300 font-medium">Wishlist</span>
        </div>
      )}

      {shouldShowFavorite && (
        <div className="flex flex-col items-center">
          <button
            onClick={handleFavoriteClick}
            className={`p-2 rounded-full transition-colors mb-1 ${
              isLiked ? "bg-red-500 hover:bg-red-400" : "bg-pink-600 hover:bg-pink-500"
            }`}
          >
            <Heart size={20} className={`text-white ${isLiked ? "fill-white" : ""}`} />
          </button>
          <span className="text-xs text-gray-300 font-medium">Favorite</span>
        </div>
      )}
    </div>
  );
};

export default CardActions;