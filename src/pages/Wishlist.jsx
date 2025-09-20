import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BookmarkPlus } from "lucide-react";
import { toggleWishlist } from "../store/slices/wishlistSlice";
import CardActions from "../components/CourseCard/CardActions";
import DefaultImage from "../assets/course_not_found_icon.png";

export default function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (course) => {
    dispatch(toggleWishlist(course));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BookmarkPlus className="w-8 h-8 text-purple-500 fill-purple-500" />
          <h1 className="text-4xl font-bold text-gray-800">My Wishlist</h1>
        </div>
        <p className="text-gray-600 text-lg">
          {wishlist.length} course{wishlist.length !== 1 ? 's' : ''} in your wishlist
        </p>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4">
        {wishlist.length === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <BookmarkPlus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-500 mb-2">No courses in wishlist yet</h2>
            <p className="text-gray-400">Start adding courses to your wishlist!</p>
          </div>
        ) : (
          // Wishlist Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((course) => (
              <div key={course.id} className="relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-orange-200 via-orange-400 to-orange-400 hover:scale-105 transition-transform duration-300 group w-84 h-96 mx-auto">
                <div className="relative h-60 overflow-hidden rounded-t-2xl">
                  <img
                    src={course.imageUrl || DefaultImage}
                    alt={course.title || "Untitled"}
                    className="w-full h-full object-cover rounded-t-2xl"
                  />

                  {course.category && (
                    <div className="absolute top-0 left-0 px-5 py-2 bg-blue-600 text-white font-bold z-10 rounded-tl-2xl rounded-br-2xl">
                      {course.category}
                    </div>
                  )}

                  {course.price != null && (
                    <div className="absolute top-0 right-0 px-5 py-2 bg-purple-600 text-white font-bold z-10 rounded-tr-2xl rounded-bl-2xl">
                      {course.price == 0 ? "Free" : `$${course.price}`}
                    </div>
                  )}
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-orange-500/90 to-transparent text-white p-4 transform translate-y-2/3 group-hover:translate-y-0 transition-transform duration-300 h-40">
                  <h3 className="text-lg font-bold mb-2 truncate">{course.title}</h3>
                  <p className="text-sm mb-3 opacity-90 line-clamp-2">{course.description}</p>

                  {/* Show only details and wishlist */}
                  <CardActions 
                    courseData={course} 
                    showOnly={['details', 'wishlist']}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}