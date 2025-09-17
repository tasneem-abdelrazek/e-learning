import React from 'react';
import Button from '../button/button';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-10 right-10 w-8 h-8 bg-white opacity-20 rounded-full"></div>
      <div className="absolute top-20 right-32 w-4 h-4 bg-white opacity-30 rounded-full"></div>
      <div className="absolute bottom-32 left-16 w-6 h-6 bg-white opacity-25 rounded-full"></div>
      <div className="absolute bottom-20 left-40 w-3 h-3 bg-white opacity-35 rounded-full"></div>
      <div className="absolute top-32 left-20 w-5 h-5 bg-white opacity-20 rounded-full"></div>
      
      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-xl">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-snug">
            Get Access to Unlimited Educational Resources, Everywhere, Everytime!
          </h1>
          <Button 
            text="Get Started" 
            variant="whiteToGradient"
            size="md"
            shape="pill"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
