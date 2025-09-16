// src/components/Navbar/LogoTitle.jsx
import React from "react";

export default function LogoTitle({ logo, title = "", width = 40, height = 40 }) {
  return (
    <div className="flex items-center space-x-3">
      <img
        src={logo}
        alt="Logo"
        style={{ width: `${width}px`, height: `${height}px` }}
        className="object-contain"
        onError={(e) => {
          console.log('Logo failed to load:', logo);
          e.target.style.display = 'none';
        }}
      />
      <h1 className="text-xl font-bold text-black">{title}</h1>
    </div>
  );
}