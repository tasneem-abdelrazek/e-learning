import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { SiGmail } from "react-icons/si";

const InstructorCard = ({ course }) => {
  if (!course) return <p className="text-center mt-4">Loading instructor...</p>;

  const { instructor, email, bio } = course;

  return (
    <div className="bg-white p-6 max-w-sm mx-auto rounded-lg shadow-lg">
      <h3 className="text-orange-500 text-lg font-semibold text-center mb-6">
        Instructor
      </h3>

      {/* Static SVG Avatar */}
      <div className="flex justify-center mb-4">
        <svg
          className="w-24 h-24 rounded-full bg-gray-200 p-2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="8" r="4" className="text-gray-400" />
          <path d="M16 16c-1.333-2-2.667-2-4-2s-2.667 0-4 2c-1.333 2-1.333 4-1.333 4h10.667s0-2  -1.333-4z" className="text-gray-400" />
        </svg>
      </div>

      <h4 className="text-gray-700 text-lg font-semibold text-center mb-3">{instructor}</h4>

      <p className="text-gray-500 text-sm text-center leading-relaxed mb-4">{bio}</p>

      <p className="text-gray-700 text-sm text-center mb-6 flex items-center justify-center space-x-2">
        <SiGmail className="w-6 h-6 text-red-500" />
        <span>{email}</span>
      </p>

      <div className="flex justify-center space-x-3">
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition">
          <Facebook size={14} className="text-white" />
        </div>
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition">
          <Instagram size={14} className="text-white" />
        </div>
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition">
          <Twitter size={14} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
