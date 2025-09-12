import React from "react";

export default function LogoTitle({ logo, title = "", width = 40, height = 40 }) {
  return (
    <div className="flex items-center space-x-3">
      <img
        src={logo}
        alt="Logo"
        style={{ width: `${width}px`, height: `${height}px` }}
      />
      <h1 className="text-xl font-bold">{title}</h1>
    </div>
  );
}
// <LogoTitle logo={logo1} title="MyWebsite" width={50} height={50} /> ex
//npm install @heroicons/react cmd library icon 
 


