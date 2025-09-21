import VideoCard from "../components/CourseCard/VideoCard"
import { useSelector } from "react-redux";
const Favorites = () => {
    const { favorites } = useSelector((state) => state.favorites);

    if (!favorites.length) {
        return <p className="text-center text-gray-500 mt-10">No favorites yet ❤️</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {favorites.map((course) => (
                <VideoCard key={course.id}
                    courseData={course}
                    actionConfige={{
                        showHeart: true,
                        showDtails: false, showRemove: false,
                        showJoin: false, showWishList: false
                    }} />
            ))}
        </div>
    );
};

export default Favorites;