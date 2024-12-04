import { createContext, useRef, useState } from "react";

/**
 * @type {React.Context<{
 *   openMenuRef?: TooltipRef;
 *   activeTask?: ActiveCollectionTask;
 *   setActiveTask?: SetState<ActiveCollectionTask>;
 * }>}
 */
export const SideBarContext = createContext({});

const SideBarContextProvider = ({ children }) => {
  /** @type {TooltipRef} */
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
