import './style.css'
import HeroSection from '../components/HeroSection/HeroSection'
import Button from '../components/button/button';
import CoursesSection from '../components/CoursesSection/CoursesSection';
import { useNavigate } from 'react-router-dom';
import CTASection from '../components/CTASection/CTASection';
import { useSelector } from "react-redux";
import en from "../Local/en";
import ar from "../Local/ar";

function Home() {
  const navigate = useNavigate();

  const lang = useSelector((state) => state.lang.language);

  const content = lang === "en" ? en : ar;
  return (
    <>
      <HeroSection title={`${content.accessResources}`} description={`${content.premiumAccess}`} buttons={[{ text: `${content.getAccess}` }]} height="60vh" />
      

      <CTASection />

        <HeroSection title={`${content.successStories}`} description={`${content.platformDescription}`} buttons={[{ text: `${content.discover}` }]} height="60vh" />

        <div className='bg-white'>
          <h1 className='gradient-text text-center' style={{ fontWeight: "900" }}>{content.courses}</h1>
          <CoursesSection limitCount={6} showFilter={false} showPagination={false}/>
          <div className='flex justify-center pb-10'>
            <Button text={`${content.exploreMoreCourses}`} variant='gradientOrangeHero' onClick={() => navigate("/login")}/>
          </div>
        </div>
    </>

  )
}

export default Home