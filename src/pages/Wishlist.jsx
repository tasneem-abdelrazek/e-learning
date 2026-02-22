import React from "react";
import { useSelector } from "react-redux";
import WishlistButton from "../components/CourseCard/WishlistButton";

const Wishlist = () => {
  const { wishlist } = useSelector((state) => state.wishlist);

  if (!wishlist.length) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No items in your Wishlist 💜
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {wishlist.map((course) => (
        <div key={course.id} className="p-4 bg-gray-800 rounded-lg shadow">
          {/* بيانات الكورس */}
          <h3 className="text-lg font-semibold text-white mb-3">
            {course.title}
          </h3>
          <p className="text-sm text-gray-400 mb-4">{course.description}</p>

          {/* زرار Wishlist */}
          <WishlistButton courseData={course} />
        </div>
      ))}
    </div>
  );
};

export default Wishlist;