import React, { useState } from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import CoursesSection from "../components/CoursesSection/CoursesSection";
import en from "../Local/en";
import ar from "../Local/ar";
import { useSelector } from "react-redux";

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const lang = useSelector((state) => state.lang.language);

  const content = lang === "en" ? en : ar;
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="mt-6">
        <HeroSection
          title={content.browseTutorials}
          height="60vh"
          description={
            <>
              {content.accessPremium}{" "}
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

      {/* Search */}
      <div className="m-10">
        <div className="flex justify-center">
          <div className="relative w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder= {content.searchCourses}
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
              />
            </svg>

            {/* Clear icon */}
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-white hover:text-gray-200"
              >
                &#10005;
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <CoursesSection searchTerm={searchTerm} />
    </div>
  );
}
