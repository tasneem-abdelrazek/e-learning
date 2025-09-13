import React from "react";
import Links from "./navlinks";
import Button from "../button/button";
import logo1 from "./pic.svg"; // logo image Company
import LogoTitle from "./logo"; // logo component
import cart from "./cart.svg";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow px-8 py-4">
      <div className="flex items-center justify-between">
        <LogoTitle logo={logo1} title="MyWebsite" width={50} height={50} />

        <div className="flex-1 flex justify-center">
          <Links />
        </div>

        <div className="flex items-center space-x-4">
          <LogoTitle logo={cart} title="" width={30} height={30} />
  <Button text="Sign Up" variant="primary" shape="pill" />        </div>
      </div>
    </nav>
  );
}
