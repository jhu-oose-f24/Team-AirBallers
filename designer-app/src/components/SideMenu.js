// src/app/components/SideMenu.js
import React from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function SideMenu({ isOpen, toggleMenu }) {
    const router = useRouter();

    return (
        <div className={`side-menu ${isOpen ? "open" : "closed"}`}>
            <button className="btn-hamburger" onClick={toggleMenu}>
                <Bars3Icon className="h-8 w-8 text-black" />
            </button>
            <p>Menu Item 1</p>
            <p>Menu Item 2</p>
            <p>Menu Item 3</p>

            <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <button
            className="btn-collection"
            onClick={() => router.push("/collection", { scroll: false })}
            >
            View Collection
            </button>
        </div>
        </div>
  );
}
