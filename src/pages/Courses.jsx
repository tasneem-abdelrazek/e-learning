// Courses.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import VideoCard from "../components/CourseCard/VideoCard";
import HeroSection from "../components/HeroSection/HeroSection";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

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
      {/* Hero Section */}
      <div className="mt-6">
        <HeroSection
          title="Welcome to Our Courses"
          description="Explore a variety of courses and start learning today!"
          buttons={[
            { text: "Get Started", variant: "whiteToGradient", size: "md", onClick: () => console.log("Get Started clicked") },
            { text: "Learn More", variant: "blackText", size: "md", onClick: () => console.log("Learn More clicked") },
          ]}
          customClasses={{
            section: "py-10 sm:py-12",
            title: "text-2xl sm:text-3xl md:text-4xl lg:text-4xl",
            description: "text-sm sm:text-base md:text-base lg:text-base mb-6",
            buttonsContainer: "flex flex-col sm:flex-row flex-wrap gap-3 justify-center"
          }}
        />
      </div>

      {/* Courses Grid - 4 cards per row with spacing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-16 mb-16">
        {courses.map(course => (
          <VideoCard
            key={course.id}
            id={course.id}
            title={course.title}
            image={course.image}
            price={course.price}
            category={course.category}
            date={course.createdAt ? new Date(course.createdAt.seconds * 1000).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }) : "N/A"}
            rating={4.5}
          />
        ))}
      </div>
    </div>
  );
}