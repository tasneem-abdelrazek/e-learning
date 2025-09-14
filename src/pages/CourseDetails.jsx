import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import HeroSection from "../components/HeroSection/HeroSection";
import RandoumCourses from "../components/details/RandoumCourses";
import NavigationBar from "../components/details/NavigationBar";
import Description from "../components/details/Description";
import InstructorCard from "../components/details/InstructorCard";
import LessonSidebar from "../components/details/LessonSidebar";
import Button from "../components/button/button";
import NewsletterComponent from "../components/details/NewsletterComponent";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      setLoading(true);
      try {
        // Fetch main course data
        const courseRef = doc(db, "courses", id);
        const courseSnap = await getDoc(courseRef);
        if (courseSnap.exists())
          setCourse({ id: courseSnap.id, ...courseSnap.data() });
        else setCourse(null);

        // Fetch all courses for "You Might Also Like"
        const coursesCol = collection(db, "courses");
        const snapshot = await getDocs(coursesCol);
        const coursesList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllCourses(coursesList.filter((c) => c.id !== id));
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

  if (loading)
    return (
      <p className="text-center mt-4 text-sm">Loading course details...</p>
    );

  if (!course)
    return (
      <div className="text-center py-6">
        <h2 className="text-xl font-bold text-red-500 mb-2">
          Course not found!
        </h2>
        <p className="text-sm mb-4">Course with ID {id} does not exist.</p>
        <Button
          text="Back to Courses"
          variant="primary"
          size="md"
          onClick={() => navigate("/courses")}
        />
      </div>
    );

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <HeroSection
        title=""
        description="You can either enroll for this course to gain access and also to the materials attached to it online only, or you can add to cart for checkout to view offline."
        buttons={[
          {
            text: "Add to Cart",
            variant: "whiteToGradient",
            size: "md",
            onClick: () => {},
          },
          {
            text: "Become Prime",
            variant:"whiteToGradient",
            size: "md",
            onClick: () => {},
          },
        ]}
        customClasses={{
          section: "py-6 sm:py-8",
          title: "hidden",
          description: "text-sm sm:text-base md:text-base lg:text-base mb-4",
          buttonsContainer: "flex flex-col sm:flex-row gap-2 justify-center",
        }}
      />

      {/* Video / Image Section + Back Button */}
      <div className="max-w-5xl mx-auto p-4 mb-4">
        {course.videoUrl ? (
          <div className="relative w-full h-56 md:h-80 mb-4">
            <iframe
              src={course.videoUrl}
              title={course.title}
              className="w-full h-full rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : course.imageUrl ? (
          <img
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-56 md:h-80 object-cover rounded-xl mb-4"
          />
        ) : (
          <div className="w-full h-56 md:h-80 flex items-center justify-center bg-gray-200 text-red-500 text-sm font-bold rounded-xl mb-4">
            No video or image available
          </div>
        )}

        <Button
          text="Back to Courses"
          variant="primary"
          size="md"
          onClick={() => navigate("/courses")}
        />
      </div>

      <NavigationBar />

      {/* Course Details Section */}
      <div className="max-w-6xl mx-auto p-4 mb-4">
        <div className="flex flex-wrap lg:flex-nowrap justify-start gap-4">
          <div className="border border-orange-500 rounded-xl p-6">
            <InstructorCard course={course} />
          </div>
          <div className="border border-orange-500 rounded-xl p-4">
            <Description course={course} />
          </div>
          <div className="border border-orange-500 rounded-xl p-4 whitespace-nowrap">
            <LessonSidebar />
          </div>
        </div>
      </div>

      {/* You Might Also Like */}
      {allCourses.length > 0 && (
        <div className="max-w-6xl mx-auto p-4 mb-4">
          <h2 className="text-lg font-bold mb-3">You Might Also Like</h2>
          <RandoumCourses courses={allCourses} />
        </div>
      )}

      {/* Bottom Hero Section */}
      <HeroSection
        title="Start Learning Today"
        description="Join thousands of learners and improve your skills."
        buttons={[
          { text: "Sign Up", variant: "white", to: "/signup" },
          { text: "Learn More", variant: "secondary", to: "/courses" },
        ]}
        customClasses={{
          section: "py-6 sm:py-8",
          title: "text-2xl sm:text-3xl md:text-3xl lg:text-3xl mb-4",
          description: "text-sm sm:text-base md:text-base lg:text-base mb-4",
          buttonsContainer: "flex flex-col sm:flex-row gap-2 justify-center",
        }}
      />

      <NewsletterComponent />
    </div>
  );
}
