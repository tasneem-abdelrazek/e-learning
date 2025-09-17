import React, { useState } from "react";

const LessonSidebar = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);

  const lessons = ["Lesson 1", "Lesson 2", "Lesson 3", "Lesson 4"];

  return (
    <div className="bg-white p-4 max-w-xs  ">
      {/* Module 1 */}
      <h3 className="text-orange-500 font-semibold text-sm mb-2">Module 1</h3>
      <ul className="ml-4 space-y-1 text-gray-600 text-sm">
        {lessons.map((lesson, index) => (
          <li
            key={index}
            onClick={() => setSelectedLesson(index)}
            className={`cursor-pointer p-1 rounded ${
              selectedLesson === index ? "text-orange-500 font-semibold" : ""
            }`}
          >
            {lesson}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonSidebar;
