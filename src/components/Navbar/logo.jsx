// src/components/Navbar/LogoTitle.jsx
import React from "react";
import logo from "./El.svg"; 

export default function LogoTitle({ title = "", width = 40, height = 40 }) {
  return (
    <div className="flex items-center space-x-3">
      <img
        src={logo}
        alt="Logo"
        style={{ width: `${width}px`, height: `${height}px` }}
        className="object-contain"
      />
      <h1 className="text-xl font-bold text-black">{title}</h1>
    </div>
  );
}