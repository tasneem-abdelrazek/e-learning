import { useSelector } from "react-redux";
import VideoCard from "../components/CourseCard/VideoCard";

export default function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  return (
    <div className="p-6">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-10 text-center">
        My Wishlist
      </h2>

      {/* Check if empty */}
      {wishlist.length === 0 ? (
        <p className="text-center text-gray-400">No courses in wishlist yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((course) => (
            <VideoCard
              key={course.id}
              id={course.id}
              title={course.title}
              image={course.image}
              price={course.price}
              category={course.category}
              date={course.date}
              rating={course.rating}
              showActions={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}