import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import CardActions from "../CourseCard/CardActions";

const RandoumCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch courses from Firebase
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const coursesArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(coursesArray);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    // Initialize Swiper after courses are loaded
    if (courses.length > 0 && window.Swiper) {
      const swiper = new window.Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        },
      });
    }
  }, [courses]);

  if (loading) {
    return <p className="text-gray-500">Loading courses...</p>;
  }

  if (!courses || courses.length === 0) {
    return <p className="text-gray-500">No courses available right now.</p>;
  }

  const randomCourses = courses.sort(() => 0.5 - Math.random()).slice(0, 5);

  return (
    <div className="relative">
      <div className="swiper mySwiper">
        <div className="swiper-wrapper">
          {randomCourses.map((course) => (
            <div key={course.id} className="swiper-slide">
              <div className="border border-gray-300 rounded-lg shadow-md p-4 flex flex-col justify-between h-full">
                {course.imageUrl ? (
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                    <span className="text-gray-600">No Image</span>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {course.description || "No description available."}
                  </p>
                </div>

                <CardActions courseData={course} showHeart={true} />
              </div>
            </div>
          ))}
        </div>
        
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
        
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
};

export default RandoumCourses;