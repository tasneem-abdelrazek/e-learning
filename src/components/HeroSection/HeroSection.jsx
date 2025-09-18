import React from "react";
import Button from "../button/button";

export default function HeroSection({
  title = "Your Hero Title Here",
  description = "Your description goes here.",
  buttons = [] 
}) {
  return (
    <section className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-white py-20 px-5 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
      <p className="text-lg md:text-xl mb-8">{description}</p>
      
      <div className="flex flex-wrap justify-center gap-4">
        {buttons.map((btn, index) => (
          <Button 
            key={index}
            text={btn.text}
            variant={btn.variant}
            shape={btn.shape}
            size={btn.size}
            onClick={btn.onClick}
          />
        ))}
      </div>
    </section>
  );
}
