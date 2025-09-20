
import { useSelector } from "react-redux";
import VideoCard from "../components/CourseCard/VideoCard";

export default function Favorites() {
  const favorites = useSelector((state) => state.favorites.favorites);

  return (
    <div className="px-6 py-10">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-12 text-center">
        My Favorite Courses
      </h2>

      {favorites.length === 0 ? (
        <p className="text-gray-600">No favorite courses yet.</p>
      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {favorites.map((course) => (
            <VideoCard
              key={course.id}
              id={course.id}
              title={course.title}
              image={course.image}
              price={course.price}
              category={course.category}
              description={course.description}
              showActions={false}
              date={
                course.createdAt
                  ? new Date(course.createdAt.seconds * 1000).toLocaleDateString(
                    "en-US",
                    { day: "2-digit", month: "short", year: "numeric" }
                  )
                  : "N/A"
              }
              rating={course.rating || 4.5}
            />
          ))}
        </div>
      )}
    </div>
  );
}