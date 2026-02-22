import { useState } from "react";
import { Link } from "react-router-dom";
import { User, ChevronDown } from "lucide-react";
import NavLinks from "./NavLinks";
import Button from "../button/button";
import UserSidebar from "./UserSidebar";
import logo1 from "./El.svg";
import LogoTitle from "./logo";

import { useDispatch, useSelector } from "react-redux";
import { toggleLanguage } from "../../store/slices/langSlice";
import en from "../../Local/en";
import ar from "../../Local/ar";

export default function Navbar({ currentUser, onLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const dispatch = useDispatch();
  const lang = useSelector((state) => state.lang.language);
  const content = lang === "en" ? en : ar;

  return (
    <>
      {/* Navbar Container */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-11/12 md:w-10/12 lg:w-10/12 bg-white/90 backdrop-blur-md rounded-2xl z-50
  shadow-[0_8px_30px_rgba(255,140,0,0.7)] hover:shadow-[0_12px_40px_rgba(255,120,0,0.9)]
  transition-all duration-300">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <LogoTitle logo={logo1} title="Learnix" width={60} height={60} />
          </Link>

          {/* Nav Links */}
          <div className="hidden lg:flex flex-1 justify-center">
            <NavLinks />
          </div>

          <div className="px-4"> <Button
            text={lang === "en" ? content.ar : content.en}
            variant="gradientOrange"
            shape="rounded"
            onClick={() => dispatch(toggleLanguage())}
          /></div>

          {/* User / Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {!currentUser ? (
              <>
                <Link to="/register">
                  <Button text={content.signup} variant="gradientOrange" shape="rounded" />
                </Link>
                <Link to="/login">
                  <Button text={content.login} variant="gradientOrange" shape="rounded" />
                </Link>
              </>
            ) : (
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full shadow-md hover:from-orange-600 hover:to-amber-600 transition-all duration-300"
              >
                <User size={18} />
                <span className="font-medium text-sm">{currentUser.name}</span>
                <ChevronDown
                  size={16}
                  className={`${isSidebarOpen ? "rotate-180" : ""} transition-transform`}
                />
              </button>
            )}
          </div>

          {/* Hamburger for mobile */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsSidebarOpen(true)}   // 👈 فتح الـ Sidebar
              className="p-2 text-gray-600 hover:text-orange-500 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>


      {/* Spacer to keep content from going تحت Navbar */}
      <div className="h-24 md:h-28 lg:h-32"></div>

      {/* User Sidebar */}
      {currentUser && (
        <UserSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          currentUser={currentUser}
          onLogout={() => {
            setIsSidebarOpen(false);
            onLogout();
          }}
        />
      )}
    </>
  );
}
