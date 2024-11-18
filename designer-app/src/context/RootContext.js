"use client";

import { createContext, useState } from "react";

/**
 * @typedef {{ title: string; back?: string }} HeaderState
 * @type {React.Context<{
 *   headerRef?: HTMLElement;
 *   sideBarRef?: HTMLElement;
 *   sideBarOpen?: boolean;
 *   headerState?: HeaderState;
 *   setHeaderRef?: UseState<HTMLElement>[1];
 *   setSideBarRef?: UseState<HTMLElement>[1];
 *   setSideBarOpen?: UseState<boolean>[1];
 *   setHeaderState?: UseState<HeaderState>[1];
 * }>}
 */
export const RootContext = createContext({});

const RootContextProvider = ({ children }) => {
  const [headerRef, setHeaderRef] = useState(null);
  const [sideBarRef, setSideBarRef] = useState(null);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [headerState, setHeaderState] = useState({ title: "Designer-App" });

  return (
    <RootContext.Provider
      value={{
        // state
        headerRef,
        sideBarRef,
        sideBarOpen,
        headerState,

        // set state
        setHeaderRef,
        setSideBarRef,
        setSideBarOpen,
        setHeaderState,
      }}
    >
      {children}
    </RootContext.Provider>
  );
};

export default RootContextProvider;
