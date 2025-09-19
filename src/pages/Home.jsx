import './style.css'
import HeroSection from '../components/HeroSection/HeroSection'
import Button from '../components/button/button';
import CoursesSection from '../components/CoursesSection/CoursesSection';
import { useNavigate } from 'react-router-dom';
import CTASection from '../components/CTASection/CTASection';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <HeroSection title={"Get Access to Unlimited Educational Resources. Everywhere, Everytime!"} description={"premium access to more than 10,000 resources ranging from courses, events e.t.c."} buttons={[{ text: "Get Access" }]} height="60vh" />
      

      <CTASection />

        <br /><br /><br />
        <HeroSection title={"Success Stories From Our Students WorldWide!"} description={"Semaj Africa is an online education platform that delivers video courses, programs and resources for Individual, Advertising & Media Specialist, Online Marketing Professionals, Freelancers and anyone looking to pursue a career in digital marketing, Accounting, Web development, Programming. Multimedia and CAD design."} buttons={[{ text: "Discover" }]} height="80vh" />

        <div className='bg-white'>
          <br />
          <h1 className='gradient-text text-center' style={{ fontWeight: "900" }}>Courses</h1>
          <CoursesSection limitCount={6} showFilter={false}/>
          <div className='flex justify-center pb-10'>
            <Button text={"Explore More Courses"} variant='gradientOrangeHero' onClick={() => navigate("/login")}/>
          </div>
        </div>
    </>

  )
}

export default Home