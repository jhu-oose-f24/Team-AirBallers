"use client";

import Button from "@/components/Button";
import { RootContext } from "@/context/RootContext";
import { pause } from "@/util/misc";
import { IconChevronLeft, IconLayoutGrid } from "@tabler/icons-react";
import clsx from "clsx";
import { SessionContext, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const Header = () => {
  const router = useRouter();

  const session = useContext(SessionContext);
  const {
    sideBarRef,
    sideBarOpen,
    setSideBarOpen,
    headerState: { title, back },
  } = useContext(RootContext);

  const signedIn = !!session?.data?.user;

  function goBack() {
    router.push(back);
  }

  async function toggleSideBar() {
    if (!sideBarRef) {
      setSideBarOpen(!sideBarOpen);
      return;
    }

    if (sideBarOpen) {
      setSideBarOpen(false);
      await pause(100);
      sideBarRef.style.visibility = "hidden";
    } else {
      sideBarRef.style.visibility = "visible";
      await pause(100);
      setSideBarOpen(true);
    }
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
        label={signedIn ? "Sign out" : "Sign in"}
        onClick={() => (signedIn ? signOut() : signIn("google"))}
        xPad="0.6rem"
        stretch
      />
    </header>
  );
};

export default Header;
