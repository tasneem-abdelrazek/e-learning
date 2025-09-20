import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import * as coursesActions from "../../store/slices/coursesSlice";
import VideoCard from "../CourseCard/VideoCard";
import DefaultImage from "../../assets/course_not_found_icon.png";

function CoursesSection({ limitCount, showFilter = true, searchTerm = "" }) {
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  
  const coursesPerPage = 6;

  const categories = ["All", "Web Development", "Marketing", "Design"];
  const priceRanges = [
    { label: "Free", min: 0, max: 0 },
    { label: "$1 - $50", min: 1, max: 50 },
    { label: "$50 - $100", min: 51, max: 100 },
    { label: "$100 - $150", min: 101, max: 150 },
    { label: "$150 - $200", min: 151, max: 200 },
    { label: "$200+", min: 201, max: 1000 },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      let q;
      if (selectedCategory === "All") {
        q = collection(db, "courses");
      } else {
        q = query(collection(db, "courses"), where("category", "==", selectedCategory));
      }

      const querySnapshot = await getDocs(q);
      let coursesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // فلترة حسب السعر
      if (selectedPrice) {
        coursesArray = coursesArray.filter(
          (course) =>
            course.price >= selectedPrice.min &&
            course.price <= selectedPrice.max
        );
      }

      // فلترة حسب السيرش
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        coursesArray = coursesArray.filter(
          (course) =>
            course.title.toLowerCase().includes(term) ||
            course.category.toLowerCase().includes(term)
        );
      }

      setCourses(coursesArray);
      dispatch(coursesActions.setCourses(coursesArray)); // استخدم الـ import الجديد
      setCurrentPage(1);
    };

    fetchCourses();
  }, [selectedCategory, selectedPrice, searchTerm, dispatch]);

  // حساب الكورسات اللي هتظهر في الصفحة الحالية
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const totalPages = Math.ceil(courses.length / coursesPerPage);

  return (
    <div className="courses-section p-6 md:p-10">
      {showFilter && (
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
          {/* Categories Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  selectedCategory === cat
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-orange-100"
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Price Filter */}
          <div>
            <select
              value={selectedPrice?.label || ""}
              onChange={(e) =>
                setSelectedPrice(priceRanges.find((range) => range.label === e.target.value))
              }
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-orange-500"
            >
              <option value="">All Prices</option>
              {priceRanges.map((range) => (
                <option key={range.label} value={range.label}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentCourses.length > 0 ? (
          currentCourses.map((course) => (
            <VideoCard
              key={course.id}
              courseData={course}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No courses available.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-3">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-full border ${
                page === currentPage ? "bg-orange-500 text-white" : "bg-white text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CoursesSection;