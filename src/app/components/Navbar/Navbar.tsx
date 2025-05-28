import React from "react";
import NavbarUpper from "./NavbarUpper";
import NavbarLower from "./NavbarLower";
import dynamic from "next/dynamic";

interface NavbarProps {
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}
const NavbarMiddle = dynamic(() => import("./NavbarMiddle"), { ssr: false });
export default function Navbar({ isCartOpen, setIsCartOpen }: NavbarProps) {
  return (
    <div>
      <NavbarUpper />
      <NavbarMiddle isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      <NavbarLower />
    </div>
  );
}
