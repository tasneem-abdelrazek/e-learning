import React from 'react';
import { BookOpen, Users, Award } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <BookOpen className="w-12 h-12 text-orange-500" />,
      title: "Unlimited Access",
      description: "Access thousands of courses and learning materials anytime, anywhere."
    },
    {
      icon: <Users className="w-12 h-12 text-orange-500" />,
      title: "Expert Teachers",
      description: "Learn from industry experts and experienced professionals."
    },
    {
      icon: <Award className="w-12 h-12 text-orange-500" />,
      title: "Learn Anywhere",
      description: "Study on your schedule with our flexible learning platform."
    }
  ];

  return (
    <div className="bg-orange-50 py-20">
      <div className="container mx-auto px-8">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;