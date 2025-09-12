import Button from "../button/button";

const HeroSection = ({ title, description, buttons = [] }) => {
  return (
    <section className="bg-gradient-to-r from-[#FFC000] to-[#FF8A00] text-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 text-center">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          {title}
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
          {description}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
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
