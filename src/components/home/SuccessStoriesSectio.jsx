import React from 'react';
import Button from '../button/button';

const SuccessStoriesSection = () => {
  return (
    <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-white py-20">
      <div className="container mx-auto px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          
          {/* Left Text Section */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold mb-2">Success Stories</h2>
            <h3 className="text-4xl font-bold mb-2">From Our Students</h3>
            <h4 className="text-4xl font-bold mb-8">Worldwide!</h4>
            
            <p className="text-white opacity-90 mb-8 text-lg leading-relaxed">
              Join thousands of successful graduates who have transformed their careers 
              through our platform. From complete beginners to industry professionals, 
              our students are making their mark in the tech world.
            </p>
            
            <Button 
              text="Read Stories" 
              variant="whiteToGradient"
              size="lg"
              shape="pill"
            />
          </div>
          
          {/* Right Images Grid */}
          <div className="lg:w-1/2 relative">
            <div className="grid grid-cols-3 gap-4">
              <img
                src="https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg"
                alt="Student Learning"
                className="h-32 object-cover rounded-lg"
              />
              <img
                src="https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg"
                alt="Programmer Laptop"
                className="h-40 object-cover rounded-lg mt-8"
              />
              <img
                src="https://images.pexels.com/photos/1181353/pexels-photo-1181353.jpeg"
                alt="Coding Environment"
                className="h-28 object-cover rounded-lg mt-4"
              />
              <img
                src="https://images.pexels.com/photos/1181371/pexels-photo-1181371.jpeg"
                alt="Office Programmer"
                className="h-36 object-cover rounded-lg -mt-4"
              />
              <img
                src="https://images.pexels.com/photos/1181372/pexels-photo-1181372.jpeg"
                alt="Collaboration"
                className="h-32 object-cover rounded-lg"
              />
              <img
                src="https://images.pexels.com/photos/1181373/pexels-photo-1181373.jpeg"
                alt="Coding Session"
                className="h-44 object-cover rounded-lg -mt-8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoriesSection;
