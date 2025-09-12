import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

const InstructorCard = () => {
  return (
    <div className="bg-white p-6   max-w-sm">
      {/* Title */}
      <h3 className="text-orange-500 text-lg font-semibold text-center mb-6">
        Instructor
      </h3>
      
      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 rounded-full bg-gray-300"></div>
      </div>
      
      {/* Name */}
      <h4 className="text-gray-700 text-lg font-semibold text-center mb-3">
        Bosun Jones
      </h4>
      
      {/* Bio */}
      <p className="text-gray-500 text-sm text-center leading-relaxed mb-6">
        Drew Bridewell is a senior design specialist at InVision. He also teaches user experience design on a weekly basis to the community and also has piloted UX design programs for middle schools.
      </p>
      
      {/* Social Links */}
      <div className="flex justify-center space-x-3">
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
          <Facebook size={14} className="text-white" />
        </div>
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
          <Instagram size={14} className="text-white" />
        </div>
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
          <Twitter size={14} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;