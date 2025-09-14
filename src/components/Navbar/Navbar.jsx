import React from "react";
import { Link } from "react-router-dom";
import Links from "./navlinks";
import Button from "../button/button";
import logo1 from "./El.svg";
import LogoTitle from "./logo"; // logo component

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow px-8 py-4">
      <div className="flex items-center justify-between">
        <LogoTitle logo={logo1} title="Learnix" width={80} height={80} />

        <div className="flex-1 flex justify-center">
          <Links />
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/register">
            <Button text="Sign Up" variant="primary" shape="pill" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
