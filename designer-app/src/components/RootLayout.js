"use client";

import Header from "@/components/Header";
import ScrollContainer from "@/components/ScrollContainer";
import SideBar from "@/components/SideBar";
import { useRouter } from "next/navigation";
import React, { createContext, useState } from "react";

/**
 * @typedef {{ title: string; back?: string }} HeaderState
 * @type {React.Context<{
 *   sideBarOpen?: boolean;
 *   setSideBarOpen?: UseState<boolean>[1];
 *   headerState?: HeaderState;
 *   setHeaderState?: UseState<HeaderState>[1];
 * }>}
 */
export const RootContext = createContext({});

const RootLayout = ({ children }) => {
  const router = useRouter();

  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [headerState, setHeaderState] = useState({ title: "Designer-App" });

  return (
    <RootContext.Provider
      value={{
        sideBarOpen,
        setSideBarOpen,
        headerState,
        setHeaderState,
      }}
    >
      <Header />

      <div className="root-container">
        <SideBar />
        <ScrollContainer className="page-content">{children}</ScrollContainer>
      </div>
    </RootContext.Provider>
  );
};

export default RootLayout;
