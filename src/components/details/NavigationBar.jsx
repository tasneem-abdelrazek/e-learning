import { useState } from "react";

const NavigationBar = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = [
    { name: "Overview", label: "Overview" },
    { name: "Transcript", label: "Transcript" },
    { name: "Offline Package", label: "Offline Package" },
    { name: "Exercise Files", label: "Exercise Files" },
  ];

  return (
    <div className="bg-gradient-to-r from-orange-400 to-orange-500 w-full px-6 py-4 shadow-md">
      <nav className="flex justify-center space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`
              relative px-4 py-2 font-semibold transition-all duration-200
              ${
                activeTab === tab.name
                  ? "text-white after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[3px] after:bg-white after:rounded-full"
                  : "text-white/80 hover:text-white"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default NavigationBar;
