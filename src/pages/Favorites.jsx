import { useSelector } from "react-redux";

export default function Favorites() {
  const favorites = useSelector((state) => state.favorites.favorites);

  return (
    <div>
      <h2>My Favorite Courses</h2>

      {favorites.length === 0 ? (
        <p>No favorite courses yet.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {favorites.map((course) => (
            <VideoCard
              key={course.id}
              id={course.id}
              title={course.title}
              image={course.image}
              price={course.price}
              category={course.category}
              date={course.date}
              rating={course.rating}
            />
          ))}
        </div>
      )}
    </div>
  );
}



