import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { User, ChevronDown } from "lucide-react";
import NavLinks from "./navlinks";
import Button from "../button/button";
import logo1 from "./El.svg";
import LogoTitle from "./logo";
import UserSidebar from "./UserSidebar";
import { clearUser } from "../../store/slices/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(clearUser());
    setIsSidebarOpen(false);
  };

  return (
    <>
      <nav className="w-full bg-white shadow-md relative">
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
                <Link to="/register"><Button text="Sign Up" variant="primary" shape="pill" /></Link>
                <Link to="/login"><Button text="Login" variant="primary" shape="pill" /></Link>
              </>
            ) : (
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full hover:from-orange-600 hover:to-amber-600 transition-all duration-200"
              >
                <User size={18} />
                <span className="font-medium text-sm">{currentUser.name}</span>
                <ChevronDown size={16} className={`${isSidebarOpen ? 'rotate-180' : ''} transition-transform`} />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      {currentUser && (
        <UserSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      )}
    </>
  );
}
