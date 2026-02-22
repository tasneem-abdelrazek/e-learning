import { NavLink } from "react-router-dom";
import en from "../../Local/en";
import ar from "../../Local/ar";
import { useSelector } from "react-redux";

export default function NavLinks() {
  const lang = useSelector((state) => state.lang.language);
    const content = lang === "en" ? en : ar;

  const baseClass = "nav-item cursor-pointer border-b-2 border-transparent pb-1 font-medium text-gray-700 transition-colors duration-200 hover:text-orange-500 hover:border-orange-500";
  const activeClass = "text-orange-500 border-orange-500";

  return (
    <ul className="hidden md:flex space-x-8">
      <li>
        <NavLink 
          to="/" 
          className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}
        >
          {content.home_nav}
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/courses" 
          className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}
        >
          {content.courses_nav}
        </NavLink>
      </li>
    </ul>
  );
}