"use client";

import Link from "next/link";
import { useState } from "react";
import { IconMenu2, IconLogin } from "@tabler/icons-react";
import Button from "./Button";
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

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
  };

  const router = useRouter();
  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <header className="header">

      <Button
        tint="aquamarine"
        icon={<IconMenu2 />}
        onClick={toggleMenu}
        width={"3.5rem"}
        height={"3.5rem"}
        // size="sm"
      />

      <SideMenu isOpen={isOpen} toggleMenu={toggleMenu} />

      <Link href="/" scroll={false}>
        <h1 className="title">{title}</h1>
      </Link>

      <Button
        tint="aquamarine"
        icon={<IconLogin />}
        label="Login"
        onClick={handleLoginClick}
        size="sm"
      />

    </header>
  );
}
