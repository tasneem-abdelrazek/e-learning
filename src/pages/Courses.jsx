import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import HeroSection from "../components/HeroSection/HeroSection";
import CoursesSection from "../components/CoursesSection/CoursesSection";



export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const coursesCol = collection(db, "courses");
        const snapshot = await getDocs(coursesCol);

        const coursesList = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "",
            image: data.imageUrl || "",
            price: data.price || "",
            category: data.category || "",
            createdAt: data.createdAt || null,
            description: data.description || "",
          };
        });

        setCourses(coursesList);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <p className="text-center mt-6 text-sm">Loading courses...</p>;
  }

  if (courses.length === 0) {
    return <p className="text-center mt-6 text-sm">No courses available.</p>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">


      <div className="mt-6">
        <HeroSection
          title="Browse Thousands of Our Video Tutorials Curated Only for you."
          description={
            <>
              Access all tutorials and resources when you become a premium member of{" "}
              <span className="font-bold">Learnix</span>
            </>
          }
          customClasses={{
            section: "py-10 sm:py-12",
            title: "text-2xl sm:text-3xl md:text-4xl lg:text-4xl",
            description: "text-sm sm:text-base md:text-base lg:text-base mb-6",
            buttonsContainer: "flex flex-col sm:flex-row flex-wrap gap-3 justify-center"
          }}
        />
      </div>

      <div className="m-20">
        {/* Search */}
        <div className="flex justify-center">
          <div className="relative w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for Courses i.e web-development"
              className="w-full h-20 px-10 py-3
                  border-b-4 border-white
                  focus:border-yellow-300 focus:outline-none
                  rounded-xl text-white
                  bg-gradient-to-r from-[#FF8A00] to-[#FFC000]
                  placeholder-white/70"
            />

            {/* Search icon */}
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
            </svg>

            {/* Clear icon */}
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-white hover:text-gray-200"
              >
                &#10005; {/* رمز × */}
              </button>
            )}
          </div>
        </div>

        <CoursesSection searchTerm={searchTerm} />
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-10">
          {courses.map(course => (
            <VideoCard
              key={course.id}
              id={course.id}
              title={course.title}
              image={course.image}
              description={course.description}
              price={course.price}
              category={course.category}

            />
          ))}
        </div> */}
      </div>


      <div className="mt-12">

      </div>

    </div>
  );
}
