import React, { useState } from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import DashBordCard from "../components/dashbord/DashBordCard";

const Dashboard = () => {
  const [courses, setCourses] = useState([
    { 
      id: 1, 
      title: "Introduction to Web Development", 
      type: "Free", 
      progress: 50, 
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description: "Learn the fundamentals of web development including HTML, CSS, and JavaScript."
    },
    { 
      id: 2, 
      title: "Advanced React Patterns", 
      type: "Premium", 
      progress: 80, 
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description: "Master advanced React patterns and techniques for building scalable applications."
    },
    { 
      id: 3, 
      title: "UI/UX Design Principles", 
      type: "Free", 
      progress: 30, 
      image: null,
      description: "Discover the core principles of creating intuitive and beautiful user interfaces."
    },
    { 
      id: 4, 
      title: "Data Structures and Algorithms", 
      type: "Free", 
      progress: 60, 
      videoUrl: "https://www.youtube.com/embed/8hly31xKli0",
      description: "Essential data structures and algorithms for technical interviews and problem solving."
    },
  ]);

  const handleJoin = (courseId) => {
    console.log("Joining course:", courseId);
 
  };

  const handleUnjoin = (courseId) => {
    console.log("Unjoining course:", courseId);
   
    setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Hero Section */}
      <HeroSection
        title="Welcome to Your Dashboard"
        description="Track your progress and manage your courses here"
        buttons={[]}
      />

      {/* Courses Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Your Courses</h2>

        {courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center max-w-7xl mx-auto">
            {courses.map((course) => (
              <DashBordCard
                key={course.id}
                course={course}
                onJoin={handleJoin}
                onUnjoin={handleUnjoin}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No courses available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;