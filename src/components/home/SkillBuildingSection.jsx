import React from 'react';
import Button from '../button/button';

const SkillBuildingSection = () => {
  return (
    <div className="bg-orange-50 py-20 relative">
    
      <div className="absolute left-0 top-0 bottom-0 w-1/3">
        <svg className="h-full w-full" viewBox="0 0 400 600" fill="none">
          <path d="M0 0 Q200 300 0 600 L0 0 Z" fill="#fb923c" />
        </svg>
      </div>
      
      <div className="container mx-auto px-8 relative">
        <div className="flex items-center">
          <div className="w-1/3"></div>
          <div className="w-2/3 pl-12">
            <h2 className="text-4xl font-bold text-orange-500 mb-4">Learn A Skill.</h2>
            <h3 className="text-4xl font-bold text-orange-500 mb-4">Build Your Portfolio.</h3>
            <h4 className="text-4xl font-bold text-orange-600 mb-8">Get Hired!</h4>
            
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Start your journey to a successful career with our comprehensive 
              learning platform. Build real-world projects, develop in-demand skills, 
              and connect with top employers looking for talented individuals like you.
            </p>
            
            <Button 
              text="Start Learning" 
              variant="gradientYellowOrange"
              size="lg"
              shape="pill"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillBuildingSection;