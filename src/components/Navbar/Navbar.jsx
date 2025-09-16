import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Links from "./navlinks";
import Button from "../button/button";
import logo1 from "./El.svg";
import LogoTitle from "./logo";
import { clearUser } from "../../store/slices/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <nav className="w-full bg-white shadow px-8 py-4">
      <div className="flex items-center justify-between">
        <LogoTitle logo={logo1} title="Learnix" width={80} height={80} />

        <div className="flex-1 flex justify-center">
          <Links />
        </div>

        {!currentUser ? (
          <div className="flex items-center space-x-4">
            <Link to="/register">
              <Button text="Sign Up" variant="primary" shape="pill" />
            </Link>
            <Link to="/login">
              <Button text="Login" variant="primary" shape="pill" />
            </Link>
          </div>
        ) : (
          <div className="flex items-center">
            <Button
              text="Logout"
              variant="redOutline"
              shape="pill"
              onClick={handleLogout}
            />
          </div>
        )}
      </div>
    </nav>
  );
}
