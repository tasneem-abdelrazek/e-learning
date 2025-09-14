import { NavLink } from "react-router-dom";

export default function NavLinks() {
  const baseClass = "nav-item cursor-pointer border-b-2 border-transparent pb-1 font-medium text-gray-700 transition-colors duration-200 hover:text-orange-500 hover:border-orange-500";
  const activeClass = "text-orange-500 border-orange-500";

  return (
    <ul className="hidden md:flex space-x-8">
      <li>
        <NavLink to="/" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}>Home</NavLink>
      </li>
      <li>
        <NavLink to="/courses" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}>Courses</NavLink>
      </li>
   
    </ul>
  );
}
