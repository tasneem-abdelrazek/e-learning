export default function Button({ 
  text, 
  variant = "primary", 
  shape = "pill",   // pill | square | rounded
  size = "md",      // sm | md | lg | xl
  onClick          
}) {
  const baseClasses =
    "font-semibold transition duration-200 transform focus:outline-none";

  const shapes = {
    pill: "rounded-full",
    square: "rounded-md",
    rounded: "rounded-lg",
  };

  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  const variants = {
      blackText: `
    bg-white text-black border border-gray-300 
    hover:bg-gradient-to-r hover:from-[#FFC000] hover:to-[#FF8A00] 
    hover:text-white hover:border-transparent
  `, 
    primary: "bg-orange-500 text-white hover:bg-orange-600",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    white: "bg-white text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white",

    gradientOrange: "bg-gradient-to-r from-orange-600 to-orange-400 text-white hover:from-orange-700 hover:to-orange-500",
    gradientBlue: "bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:from-blue-700 hover:to-blue-500",
    gradientGreen: "bg-gradient-to-r from-green-600 to-green-400 text-white hover:from-green-700 hover:to-green-500",
    gradientPurple: "bg-gradient-to-r from-purple-600 to-purple-400 text-white hover:from-purple-700 hover:to-purple-500",
    gradientPink: "bg-gradient-to-r from-pink-600 to-pink-400 text-white hover:from-pink-700 hover:to-pink-500",
    gradientRainbow: "bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 text-white hover:from-red-500 hover:via-yellow-500 hover:via-green-500 hover:via-blue-500 hover:to-purple-500",
    
    gradientYellowOrange: "bg-gradient-to-r from-[#FFC000] to-[#FF8A00] text-white hover:from-[#FFB000] hover:to-[#FF9000]",

    red: "bg-red-500 text-white hover:bg-red-600",
    redOutline: "bg-transparent text-red-500 border border-red-500 hover:bg-red-500 hover:text-white",
    blue: "bg-blue-500 text-white hover:bg-blue-600",
    blueOutline: "bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white",
    green: "bg-green-500 text-white hover:bg-green-600",
    greenOutline: "bg-transparent text-green-500 border border-green-500 hover:bg-green-500 hover:text-white",
    black: "bg-black text-white hover:bg-gray-800",
    blackOutline: "bg-transparent text-black border border-black hover:bg-black hover:text-white",
    yellow: "bg-yellow-500 text-white hover:bg-yellow-600",
    yellowOutline: "bg-transparent text-yellow-500 border border-yellow-500 hover:bg-yellow-500 hover:text-white",
    pink: "bg-pink-500 text-white hover:bg-pink-600",
    pinkOutline: "bg-transparent text-pink-500 border border-pink-500 hover:bg-pink-500 hover:text-white",
    gray: "bg-gray-500 text-white hover:bg-gray-600",
    grayOutline: "bg-transparent text-gray-500 border border-gray-500 hover:bg-gray-500 hover:text-white",
    purple: "bg-purple-500 text-white hover:bg-purple-600",
    purpleOutline: "bg-transparent text-purple-500 border border-purple-500 hover:bg-purple-500 hover:text-white",

    whiteToGradient: `
      bg-white text-[#FF8A00] border border-[#FF8A00] 
      hover:bg-gradient-to-r hover:from-[#FFC000] hover:to-[#FF8A00] 
      hover:text-white hover:border-transparent
    `,

    fullOrange: "bg-orange-400 text-white rounded hover:bg-orange-500 transition-colors w-full sm:w-auto text-base md:text-lg",
  };

  return (
    <button
      className={`${baseClasses} ${shapes[shape]} ${sizes[size]} ${variants[variant]}`}
      onClick={onClick}  
    >
      {text}
    </button>
  );
}
