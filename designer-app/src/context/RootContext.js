"use client";

import { useOnResize } from "@/util/hooks";
import { createContext, useRef, useState } from "react";

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
 *   openMenuRef?: ContextMenuRef;
 *   activeTask?: UseState<ActiveGarmentTask>[0];
 *   setActiveTask?: UseState<ActiveGarmentTask>[1];
 * }>}
 */
export const RootContext = createContext({});

const RootContextProvider = ({ children }) => {
  const [headerRef, setHeaderRef] = useState(null);
  const [sideBarRef, setSideBarRef] = useState(null);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [headerState, setHeaderState] = useState({ title: "Designer-App" });
  const [activeTask, setActiveTask] = useState({});
  /** @type {ContextMenuRef} */
  const openMenuRef = useRef(null);

  useOnResize(() => {
    if (!openMenuRef.current?.state.isShown) return;
    openMenuRef.current.hide();
  }, []);

  return (
    <RootContext.Provider
      value={{
        // state
        headerRef,
        sideBarRef,
        sideBarOpen,
        headerState,
        openMenuRef,
        activeTask,

        // set state
        setHeaderRef,
        setSideBarRef,
        setSideBarOpen,
        setHeaderState,
        setActiveTask,
      }}
    >
      {children}
    </RootContext.Provider>
  );
};

export default RootContextProvider;
