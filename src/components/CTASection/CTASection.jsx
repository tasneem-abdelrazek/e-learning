import Icon1 from '../../assets/Icon1.png';
import Icon2 from '../../assets/Icon2.png';
import Icon3 from '../../assets/Icon3.png';
import Element from '../../assets/Element.png';
import BG_image from '../../assets/Image Placeholder.png';
import Button from "../button/button";
import en from "../../Local/en";
import ar from "../../Local/ar";
import { useSelector } from "react-redux";

const CTASection = () => {
  const lang = useSelector((state) => state.lang.language);

  const content = lang === "en" ? en : ar;
  return (
    <section className="bg py-12">
      {/* Top Icons Section */}
      <div className="title_home flex flex-col md:flex-row justify-center gap-8 px-6 py-12">
        <div className="flex flex-col items-center text-center w-full md:w-1/5">
          <img src={Icon1} alt="Unlimited Access" className="w-12 md:w-16" />
          <h3 className="font-bold my-2 text-sm sm:text-base md:text-lg">
            {content.unlimitedAccess}
          </h3>
          <p className="text-xs sm:text-sm md:text-base">
            {content.oneSubscription}
          </p>
        </div>

        <div className="flex flex-col items-center text-center w-full md:w-1/4">
          <img src={Icon2} alt="Expert Teachers" className="w-16 md:w-20" />
          <h3 className="font-bold my-2 text-sm sm:text-base md:text-lg">
            {content.expertTeachers}
          </h3>
          <p className="text-xs sm:text-sm md:text-base">
            {content.expertTeachersDesc}
          </p>
        </div>

        <div className="flex flex-col items-center text-center w-full md:w-1/4">
          <img src={Icon3} alt="Learn Anywhere" className="w-16 md:w-20" />
          <h3 className="font-bold my-2 text-sm sm:text-base md:text-lg">
            {content.learnAnywhere}
          </h3>
          <p className="text-xs sm:text-sm md:text-base">
            {content.learnAnywhereDesc}
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
        <div className="w-full md:w-1/2 p-6 ">
          <div className="gradient-text">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl">{content.learnSkill}.</p>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl">{content.buildPortfolio}.</p>
            <p className="font-extrabold text-lg sm:text-xl md:text-2xl lg:text-3xl">{content.getHired}!</p>
          </div>

          <div className="pargraph mt-4 text-sm sm:text-base md:text-lg leading-relaxed">
            {content.description}
          </div>

          <Button text={content.discover} variant="gradientOrangeHero" />
        </div>
      </div>
    </section>
  );
};

export default CTASection;
