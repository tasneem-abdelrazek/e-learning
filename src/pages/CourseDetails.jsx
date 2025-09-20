// src/pages/CourseDetails.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HeroSection from "../components/HeroSection/HeroSection";
import RandoumCourses from "../components/details/RandoumCourses";
import NavigationBar from "../components/details/NavigationBar";
import Description from "../components/details/Description";
import InstructorCard from "../components/details/InstructorCard";
import LessonSidebar from "../components/details/LessonSidebar";
import Button from "../components/button/button";
import NewsletterComponent from "../components/details/NewsletterComponent";

export default function CourseDetails() {
  const { id } = useParams(); // id from url
  const navigate = useNavigate(); 

  // Redux data come
  const coursesState = useSelector((state) => state.selectedCourse);  // data slice from store
  const course = coursesState?.course || null;                       // select course
  const allCourses = coursesState?.courses || [];
  const otherCourses = allCourses.filter(c => c.id !== id); //  delete current course

  
  if (!course) {
    return (
      <div className="text-center py-6">
        <h2 className="text-xl font-bold text-red-500 mb-2">Course not found!</h2>
        <p className="text-sm mb-4">
          Course with ID {id} was not found. Please go back to courses page and select a course.
        </p>
        <Button 
          text="Back to Courses" 
          variant="primary" 
          size="md" 
          onClick={() => navigate("/courses")} 
        />
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <HeroSection
        title={course.title}
        description={course.description}
        className="min-h-[40vh]"
        buttons={[{ text: "Enroll Now", variant: "white", size: "lg", shape: "pill" }]}
      />

      {/* Video or Image Section */}
      <div className="max-w-5xl mx-auto p-4 mb-4">
        {course.videoUrl ? (
          <iframe
            src={course.videoUrl}
            title={course.title}
            className="w-full h-56 md:h-80 rounded-xl mb-4"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
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

        <div className="flex justify-center">
          <Button
            text="Back to Courses"
            variant="white"
            size="lg"
            shape="pill"
            onClick={() => navigate("/courses")}
          />
        </div>
      </div>

      {/* Navigation Bar */}
      <NavigationBar />

      {/* Course Details Section */}
      <div className="max-w-6xl mx-auto p-4 mb-4">
        <div className="flex flex-wrap lg:flex-nowrap gap-4">
          <div className="border border-orange-500 rounded-xl p-6">
            <InstructorCard course={course} />
          </div>
          <div className="border border-orange-500 rounded-xl p-4">
            <Description course={course} />
          </div>
          <div className="border border-orange-500 rounded-xl p-4">
            <LessonSidebar />
          </div>
        </div>
      </div>

      {/* Hero Section (Bottom) */}
      <HeroSection
        title="Continue Learning"
        description="Don't stop here, keep exploring more courses with us."
        className="min-h-[40vh]"
        buttons={[{ 
          text: "Back to Courses", 
          variant: "white", 
          size: "lg", 
          shape: "pill", 
          onClick: () => navigate("/courses") 
        }]}
      />

      <NewsletterComponent />

      {/* You Might Also Like */}
      {otherCourses.length > 0 && (
        <div className="max-w-6xl mx-auto p-4 mb-4">
          <h2 className="text-lg font-bold mb-3">You Might Also Like</h2>
          <RandoumCourses courses={otherCourses} />
        </div>
      )}
    </div>
  );
}