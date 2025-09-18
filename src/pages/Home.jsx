import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import SkillBuildingSection from '../components/home/SkillBuildingSection';
import SuccessStoriesSection from '../components/home/SuccessStoriesSection';


function Home() {

  return (
    <div className="min-h-screen">
      <div className="mt-16">
        <HeroSection
          title="Get Access to Unlimited Educational Resources, Everywhere, Everytime!"
          buttons={[
            {
              text: "Get Started",
              variant: "white",
              size: "lg",
              shape: "pill",
          
            }
          ]}
        />
      </div>
      <FeaturesSection />
      <SkillBuildingSection />
      <SuccessStoriesSection />
    </div>
  );
}

export default Home;
