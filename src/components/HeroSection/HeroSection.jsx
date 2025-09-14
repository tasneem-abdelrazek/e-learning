import Button from "../button/button";

const HeroSection = ({ title, description, buttons = [] }) => {
  return (
<section className="bg-gradient-to-r from-[#FFC000] to-[#FF8A00] text-white py-10 sm:py-12 mt-6">
  <div className="mx-auto max-w-7xl px-4 text-center">
    {/* Title */}
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-4 leading-snug">
      {title}
    </h1>

    {/* Description */}
    <p className="text-sm sm:text-base md:text-base lg:text-base mb-6 opacity-90 max-w-3xl mx-auto">
      {description}
    </p>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
      {buttons.map((btn, index) => (
        <Button
          key={index}
          text={btn.text}
          variant={btn.variant || "secondary"}
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
