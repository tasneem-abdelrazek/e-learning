import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BookmarkPlus } from "lucide-react";
import { toggleWishlist } from "../../store/slices/wishlistSlice";

const WishlistButton = ({ courseData }) => {
    const dispatch = useDispatch();
    const { wishlist } = useSelector((state) => state.wishlist);

    const isInWishlist = wishlist.some((c) => c.id === courseData.id);

    const handleWishlist = () => {
        dispatch(toggleWishlist(courseData));
    };

    return (
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
    );
};

export default WishlistButton;