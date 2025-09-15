import { useState } from "react";
import { Link } from "react-router-dom";
import { User, ChevronDown } from "lucide-react";
import NavLinks from "./NavLinks";
import Button from "../button/button";
import UserSidebar from "./UserSidebar";
import logo1 from "./El.svg";
import LogoTitle from "./logo";

export default function Navbar({ currentUser, onLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <nav className="w-full bg-white shadow-md relative z-30">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <LogoTitle logo={logo1} title="Learnix" width={60} height={60} />
          </Link>

          <div className="hidden lg:flex flex-1 justify-center">
            <NavLinks />
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            {!currentUser ? (
              <>
                <Link to="/register">
                  <Button text="Sign Up" variant="primary" shape="pill" />
                </Link>
                <Link to="/login">
                  <Button text="Login" variant="primary" shape="pill" />
                </Link>
              </>
            ) : (
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full hover:from-orange-600 hover:to-amber-600 transition-all duration-200"
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

          <div className="lg:hidden">
            <button className="p-2 text-gray-600 hover:text-orange-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

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
