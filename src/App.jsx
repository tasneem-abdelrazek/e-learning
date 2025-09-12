// App.js
import "./App.css";
import HeroSection from "./components/HeroSection/HeroSection";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import VideoCard from "./components/CourseCard/VideoCard";
import CourseDetailsPage from "./components/details/CourseDetailsPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
const courses = [
  {
    id: 1,
    videoUrl: "https://www.youtube.com/embed/dGcsHMXbSOA",
    title: "React Basics",
    tag: "Free",
    tagBgColor: "bg-green-500",
    tagTextColor: "text-white",
  },
  {
    id: 2,
    videoUrl: "https://www.youtube.com/embed/w7ejDZ8SWv8",
    title: "React Hooks in Depth",
    tag: "Premium",
    tagBgColor: "bg-purple-500",
    tagTextColor: "text-white",
  },
  {
    id: 3,
    videoUrl: "https://www.youtube.com/embed/O6P86uwfdR0",
    title: "JavaScript ES6+ Features",
    tag: "New",
    tagBgColor: "bg-blue-500",
    tagTextColor: "text-white",
  },
  {
    id: 4,
    videoUrl: "https://www.youtube.com/embed/Ke90Tje7VS0",
    title: "React Full Course",
    tag: "Trending",
    tagBgColor: "bg-red-500",
    tagTextColor: "text-white",
  },
  {
    id: 5,
    videoUrl: "https://www.youtube.com/embed/PkZNo7MFNFg",
    title: "JavaScript Crash Course",
    tag: "Free",
    tagBgColor: "bg-green-500",
    tagTextColor: "text-white",
  },
  {
    id: 6,
    videoUrl: "https://www.youtube.com/embed/ntLJmHOJ0ME",
    title: "Node.js Tutorial",
    tag: "Backend",
    tagBgColor: "bg-yellow-500",
    tagTextColor: "text-black",
  },
];


  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 p-6">
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <>
                  {/* Hero Section */}
                  <HeroSection
                    title="Welcome to Our Courses"
                    description="Learn amazing skills with hands-on tutorials and examples."
                    buttons={[
                      { text: "Sign Up", variant: "white", to: "/signup" },
                      {
                        text: "Learn More",
                        variant: "secondary",
                        to: "/details/1",
                      },
                    ]}
                  />

                  {/* Courses Section */}
                  <section className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Our Courses</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {courses.map((course) => (
                        <VideoCard key={course.id} {...course} />
                      ))}
                    </div>
                  </section>
                </>
              }
            />

            {/*  Details Page */}
            <Route
              path="/details/:id"
              element={<CourseDetailsPage courses={courses} />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
