"use client";

import { RootContext } from "@/context/RootContext";
import { IconChevronLeft, IconLayoutGrid } from "@tabler/icons-react";
import clsx from "clsx";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import Button from "./Button";

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

      <Button
        variant="secondary"
        label={session ? "Sign out" : "Sign in"}
        onClick={() => (session ? signOut() : signIn("google"))}
        xPad="0.6rem"
        stretch
      />
    </header>
  );
};

export default Header;
