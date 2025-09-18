import React, { useState } from "react";
import DashboardCard from "../components/dashbord/DashBordCard";


const Dashboard = () => {

  const [courses, setCourses] = useState([
    {
      id: "1",
      title: "React Basics",
      description: "Learn the fundamentals of React.",
      type: "Free",
      image: "https://via.placeholder.com/300x200",
      progress: 30,
    },
    {
      id: "2",
      title: "Advanced JavaScript",
      description: "Deep dive into JavaScript.",
      type: "Paid",
      videoUrl: "video.mp4",
      progress: 70,
    },
    {
      id: "3",
      title: "CSS Animations",
      description: "Make your UI alive with animations.",
      type: "Free",
      progress: 50,
    },
  ]);


  const handleJoin = (courseId) => {
    console.log("Joined course:", courseId);
  
    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId ? { ...c, progress: Math.min(c.progress + 10, 100) } : c
      )
    );
  };

  const handleUnjoin = (courseId) => {
    console.log("Unjoined course:", courseId);

    setCourses((prev) => prev.map((c) => (c.id === courseId ? { ...c, progress: 0 } : c)));
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <DashboardCard
          key={course.id}
          course={course}
          onJoin={handleJoin}
          onUnjoin={handleUnjoin}
        />
      ))}
    </div>
  );
};

export default Dashboard;
