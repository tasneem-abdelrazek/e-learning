import { NavLink } from "react-router-dom";

export default function Links() {

  const baseClass = "nav-item cursor-pointer border-b-2 border-transparent pb-1 font-medium text-gray-700 transition-colors duration-200 hover:text-orange-500 hover:border-orange-500";
  const activeClass = "text-orange-500 border-orange-500";

  return (
    <ul className="hidden md:flex space-x-8">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/courses"
          className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}
        >
          Courses
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/favorites"
          className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}
        >
          Favorites
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/wishlist"
          className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}
        >
          Wishlist
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}
        >
          Dashboard
        </NavLink>
      </li>
    </ul>
  );
}
