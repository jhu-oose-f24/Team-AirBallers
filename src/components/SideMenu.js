// src/app/components/SideMenu.js
import React from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";  

export default function SideMenu({ isOpen, toggleMenu }) {
  return (
    <div className={`side-menu ${isOpen ? "open" : "closed"}`}>
        <button className="btn-hamburger" onClick={toggleMenu}>
            <Bars3Icon className="h-8 w-8 text-black" />
        </button>
        <p>Menu Item 1</p>
        <p>Menu Item 2</p>
        <p>Menu Item 3</p>
    </div>
  );
}
