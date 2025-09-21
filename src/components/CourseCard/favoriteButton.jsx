import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart } from "lucide-react";
import { toggleFavorite } from "../../store/slices/favoritesSlice";

const FavoriteButton = ({ courseData }) => {
    const dispatch = useDispatch();
    const { favorites } = useSelector((state) => state.favorites);

    const isFavorite = favorites.some((c) => c.id === courseData.id);

    const handleFavorite = () => {
        dispatch(toggleFavorite(courseData));
    };

    return (
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
    );
};

export default FavoriteButton;