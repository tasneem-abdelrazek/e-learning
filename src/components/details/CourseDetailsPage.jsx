import React from "react";
import { useParams, useNavigate } from "react-router-dom"; // ⬅️ ضيف useNavigate
import HeroSection from "../HeroSection/HeroSection";
import RandoumCourses from "./RandoumCourses";
import NavigationBar from "./NavigationBar";
import Description from "./Description";
import InstructorCard from "./InstructorCard";
import LessonSidebar from "./LessonSidebar";
import Button from "../button/button";
import NewsletterComponent from "./NewsletterComponent";

const CourseDetailsPage = ({ courses }) => {
  const { id } = useParams();
  const navigate = useNavigate(); // ⬅️ هنا

  const course = courses.find((c) => c.id === parseInt(id));

  if (!course) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-red-500">Course not found!</h2>
        <p>Course with ID {id} does not exist.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Welcome to Our Courses"
        description="Learn amazing skills with hands-on tutorials and examples."
        buttons={[
          { text: "Sign Up", variant: "white", to: "/signup" },
          { text: "Learn More", variant: "secondary", to: "/details/1" },
        ]}
      />

      <div className="max-w-5xl max-h-screen mx-auto p-6">
        {/* Video */}
        {course.videoUrl && (
          <div className="relative w-full h-5 md:h-96">
            <iframe
              src={course.videoUrl}
              title={course.title}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        
        <Button
          text="Back to Courses"
          variant="primary"
          shape="square"
          size="md"
          onClick={() => navigate("/")} 
        />
      </div>

      <NavigationBar />

      {/* Three Components Side by Side */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-wrap lg:flex-nowrap justify-start gap-6">
          <div className="border border-orange rounded-lg p-8">
            <InstructorCard />
          </div>

          <div className="border border-orange rounded-lg p-4">
            <Description />
          </div>

          <div className="border border-orange rounded-lg p-5 whitespace-nowrap">
            <LessonSidebar />
          </div>
        </div>
      </div>

      {/* Random / Suggested Courses */}
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-lg font-bold mb-4">You Might Also Like</h2>
        <RandoumCourses courses={courses.filter((c) => c.id !== course.id)} />
      </div>

      <HeroSection
        title="Welcome to Our Courses"
        description="Learn amazing skills with hands-on tutorials and examples."
        buttons={[
          { text: "Sign Up", variant: "white", to: "/signup" },
          { text: "Learn More", variant: "secondary", to: "/details/1" },
        ]}
      />
      <NewsletterComponent />
    </div>
  );
};

export default CourseDetailsPage;
