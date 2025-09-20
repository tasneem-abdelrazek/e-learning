import Icon1 from '../../assets/Icon1.png';
import Icon2 from '../../assets/Icon2.png';
import Icon3 from '../../assets/Icon3.png';
import Element from '../../assets/Element.png';
import BG_image from '../../assets/Image Placeholder.png';
import Button from "../button/button";

const CTASection = () => {
  return (
    <section className="bg py-12 px-6">
      {/* Top Icons Section */}
      <div
        className="title_home"
        style={{ display: "flex", gap: "10%", padding: "10%", justifyContent: "center" }}
      >
        <div className="flex flex-col items-center text-center" style={{ width: "20%" }}>
          <img src={Icon1} alt="Unlimited Access" />
          <h3 className="font-bold my-2 text-sm sm:text-base md:text-lg">
            Unlimited Access
          </h3>
          <p className="text-xs sm:text-sm md:text-base">
            One subscription unlimited access
          </p>
        </div>

        <div className="flex flex-col items-center text-center" style={{ width: "25%" }}>
          <img src={Icon2} alt="Expert Teachers" />
          <h3 className="font-bold my-2 text-sm sm:text-base md:text-lg">
            Expert Teachers
          </h3>
          <p className="text-xs sm:text-sm md:text-base">
            Learn from industry experts who are passionate about teaching
          </p>
        </div>

        <div className="flex flex-col items-center text-center" style={{ width: "25%" }}>
          <img src={Icon3} alt="Learn Anywhere" />
          <h3 className="font-bold my-2 text-sm sm:text-base md:text-lg">
            Learn Anywhere
          </h3>
          <p className="text-xs sm:text-sm md:text-base">
            Switch between your computer, tablet, or mobile device
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{ display: "flex" }}>
        {/* Images */}
        <div className="image-wrapper">
          <img src={Element} alt="Element" />
          <img src={BG_image} alt="BG_image" />
        </div>

        {/* Content */}
        <div style={{ width: "50%", padding: "10%" }}>
          <div className="gradient-text pt-40">
            <p>Learn A Skill.</p>
            <p>Build Your Portfolio.</p>
            <p style={{ fontWeight: "900" }}>Get Hired!</p>
          </div>
          <div className="pargraph">
            Semaj Africa is an online education platform that delivers video
            courses, programs and resources for Individual, Advertising & Media
            Specialist, Online Marketing Professionals, Freelancers and anyone
            looking to pursue a career in digital marketing, Accounting, Web
            development, Programming, Multimedia and CAD design.
          </div>
          <Button text={"Discover"} variant="gradientOrangeHero" />
        </div>
      </div>
    </section>
  );
};

export default CTASection;
