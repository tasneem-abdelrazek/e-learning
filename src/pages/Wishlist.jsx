import React from "react";
import { useSelector } from "react-redux";
import VideoCard from "../components/CourseCard/VideoCard";

const Wishlist = () => {
  const { wishlist } = useSelector((state) => state.wishlist);

  if (!wishlist.length) {
    return <p className="text-center text-gray-500 mt-10">No items in your Wishlist 💜</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {wishlist.map((course) => (
        <VideoCard
          key={course.id}
          courseData={course}
          actionsConfig={{
            showWishList: true,
            showHeart: false,
            showDetails: false,
            showRemove: false,
            showJoin: false,
          }}
        />
      ))}
    </div>
  );
};

export default Wishlist;
