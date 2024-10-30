"use client";

import { IconLogin, IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "./Button";

/**
 * @param {{
 *   title: string;
 *   onMenuClick: () => void;
 * }} props
 */
export default function Header(props) {
  const { title = "TITLE", onMenuClick } = props;
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <header className="header">
      <button onClick={onMenuClick} className="menu-button">
        <IconMenu2 />
      </button>

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
