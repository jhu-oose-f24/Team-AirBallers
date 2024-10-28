"use client";

import Link from "next/link";
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import SideMenu from "./SideMenu";

/**
 * @param {{
 *   title: string;
 * }} props
 * @returns
 */
export default function Header(props) {
  const { title = "TITLE" } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const router = useRouter();
  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <header className="header">

      <button className="btn-hamburger" onClick={toggleMenu}>
        <Bars3Icon className="h-8 w-8 text-black" />
      </button>

      <SideMenu isOpen={isOpen} toggleMenu={toggleMenu} />

      <Link href="/" scroll={false}>
        <h1 className="title">{title}</h1>
      </Link>

      <div className="auth-buttons">
        <button className="btn-login" onClick={handleLoginClick}>
          Login/Sign up
        </button>
      </div>
    </header>
  );
}
