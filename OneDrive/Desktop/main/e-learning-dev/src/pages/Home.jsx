import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import SkillBuildingSection from '../components/home/SkillBuildingSection';
import SuccessStoriesSection from '../components/home/SuccessStoriesSectio';
import Button from '../components/button/button';

function Home() {
  return (
    <div className="min-h-screen">
      <div className="mt-16">
        <HeroSection />
      </div>
      <FeaturesSection />
      <SkillBuildingSection />
      <SuccessStoriesSection />
    </div>
  );
}

export default Home;