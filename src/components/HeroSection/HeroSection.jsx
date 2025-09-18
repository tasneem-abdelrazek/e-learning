import Button from "../button/button";
import BG_image2 from '../../assets/Isolated Image Icon.png'

export default function HeroSection({
  title = "Your Hero Title Here",
  description = "Your description goes here.",
  buttons = [] 
}) {
  return (
    <section className="flex bg-gradient-to-r from-[#FF8A00] to-[#FFC000] text-white p-6 sm:p-10 lg:p-20 leading-loose" style={{height}}>
        <div className='w-1/2'>
          {/* Title */}
          <h1 className='text-base sm:text-lg md:text-2xl lg:text-3xl font-bold w-100 leading-normal'>
            {title}
          </h1>

          {/* Description */}
          <p className='text-s w-90 leading-normal py-4'>
            {description}
          </p>

          {/* Buttons */}
          <div>
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
        <img src={BG_image2} alt="BG_image2" className="w-1/4" />
    </section>

  );
}
