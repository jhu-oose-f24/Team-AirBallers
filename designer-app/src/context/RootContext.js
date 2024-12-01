"use client";

import { useOnResize } from "@/util/hooks";
import { createContext, useEffect, useRef, useState } from "react";

/**
 * @typedef {{ title?: string; back?: string }} HeaderState
 * @type {React.Context<{
 *   bodyRef?: HTMLBodyElement;
 *   headerRef?: HTMLElement;
 *   sideBarRef?: HTMLElement;
 *   sideBarOpen?: boolean;
 *   headerState?: HeaderState;
 *   setHeaderRef?: SetState<HTMLElement>;
 *   setSideBarRef?: SetState<HTMLElement>;
 *   setSideBarOpen?: SetState<boolean>;
 *   setHeaderState?: SetState<HeaderState>;
 *   openMenuRef?: TooltipRef;
 *   activeTask?: ActiveGarmentTask;
 *   setActiveTask?: SetState<ActiveGarmentTask>;
 * }>}
 */
export const RootContext = createContext({});

const RootContextProvider = ({ children }) => {
  const [bodyRef, setBodyRef] = useState(null);
  const [headerRef, setHeaderRef] = useState(null);
  const [sideBarRef, setSideBarRef] = useState(null);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [headerState, setHeaderState] = useState({});
  const [activeTask, setActiveTask] = useState(null);
  /** @type {TooltipRef} */
  const openMenuRef = useRef(null);

  useOnResize(() => {
    if (!openMenuRef.current?.state.isShown) return;
    openMenuRef.current.hide();
  }, []);

  useEffect(() => {
    setBodyRef(document.body);
  }, []);

  return (
    <RootContext.Provider
      value={{
        // state
        bodyRef,
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
