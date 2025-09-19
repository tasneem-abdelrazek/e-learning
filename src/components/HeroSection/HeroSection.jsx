import Button from "../button/button";
import BG_image2 from "../../assets/Isolated Image Icon.png";

const HeroSection = ({ title, description, buttons = [], height }) => {
  return (
    <section
      className="relative flex flex-col-reverse lg:flex-row bg-gradient-to-r from-[#FF8A00] to-[#FFC000] 
                 text-white p-6 sm:p-10 lg:p-20 leading-loose items-center gap-8 lg:gap-16 overflow-hidden"
      style={{ height }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-no-repeat bg-right-bottom bg-contain opacity-30 pointer-events-none"
        style={{ backgroundImage: `url(${BG_image2})` }}
      />

      {/* Left Side (Text + Buttons) */}
      <div className="relative z-10 w-full lg:w-1/2 text-center lg:text-left">
        {/* Title */}
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-snug">
          {title}
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg leading-relaxed py-4">
          {description}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 mt-4">
          {buttons.map((btn, index) => (
            <Button
              key={index}
              text={btn.text}
              variant="lightYellow"
              size={btn.size || "md"}
              to={btn.to}
              onClick={btn.onClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
