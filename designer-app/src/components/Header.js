"use client";

import { RootContext } from "@/components/RootLayout";
import { IconChevronLeft, IconLayoutGrid } from "@tabler/icons-react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import Button from "./Button";
import { signIn, signOut, useSession } from 'next-auth/react';

const Header = () => {
  const router = useRouter();
  const { sideBarOpen, setSideBarOpen, headerState } = useContext(RootContext);

  const { title, back } = headerState;

  const { data: session } = useSession();

  function goBack() {
    router.push(back);
  }

  function toggleSideBar() {
    setSideBarOpen(!sideBarOpen);
  }

  return (
    <header className="app-header">
      <Button
        variant="hint"
        className="action-button"
        icon={<IconLayoutGrid />}
        onClick={toggleSideBar}
        fontSize="1.8rem"
        xPad="0.3rem"
        yPad="0.3rem"
        stretch
      />

      <Button
        variant="hint"
        className={clsx("title-link", back && "back")}
        icon={back && <IconChevronLeft stroke={2.8} />}
        label={title}
        onClick={() => back && router.push(back)}
        fontSize="1.8rem"
        xPad={back && "0.3rem"}
        stretch
      />

      {session ? (
        <Button label="Logout" onClick={() => signOut()} />
      ) : (
        <Button label="Log In" onClick={() => signIn()} />
      )}
    </header>
  );
};

export default Header;
