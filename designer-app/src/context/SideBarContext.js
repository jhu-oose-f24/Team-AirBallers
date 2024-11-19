"use client";

import { createContext, useRef, useState } from "react";

/**
 * @type {React.Context<{
 *   openMenuRef?: ContextMenuRef;
 *   activeTask?: UseState<ActiveCollectionTask>[0];
 *   setActiveTask?: UseState<ActiveCollectionTask>[1];
 * }>}
 */
export const SideBarContext = createContext({});

const SideBarContextProvider = ({ children }) => {
  /** @type {ContextMenuRef} */
  const openMenuRef = useRef(null);
  /** @type {UseState<ActiveCollectionTask>} */
  const [activeTask, setActiveTask] = useState({});

  return (
    <SideBarContext.Provider
      value={{
        openMenuRef,
        activeTask,
        setActiveTask,
      }}
    >
      {children}
    </SideBarContext.Provider>
  );
};

export default SideBarContextProvider;
