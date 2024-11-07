"use client";

import { RootContext } from "@/components/RootLayout";
import { IconChevronLeft, IconLayoutGrid } from "@tabler/icons-react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import Button from "./Button";

const Header = () => {
  const router = useRouter();
  const { sideBarOpen, setSideBarOpen, headerState } = useContext(RootContext);

  const { title, back } = headerState;

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
        className={clsx("action-button", back && "back")}
        icon={back ? <IconChevronLeft stroke={2.8} /> : <IconLayoutGrid />}
        label={back && title}
        onClick={back ? goBack : toggleSideBar}
        fontSize="1.8rem"
        xPad="0.3rem"
        yPad="0.3rem"
        stretch
      />

      {!back && (
        <Button
          variant="hint"
          className="title-link"
          label={title}
          onClick={goBack}
          fontSize="1.8rem"
          stretch
        />
      )}

      <Button
        variant="secondary"
        label="Login"
        onClick={() => router.push("/login")}
        xPad="0.6rem"
        stretch
      />
    </header>
  );
};

export default Header;
