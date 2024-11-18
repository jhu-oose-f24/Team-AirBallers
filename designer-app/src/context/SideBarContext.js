"use client";

import { createContext, useRef, useState } from "react";

/**
 * @type {React.Context<{
 *   openMenuRef?: React.MutableRefObject<import("tippy.js").Instance>;
 *   collectionToDelete?: UseState<string>[0];
 *   setCollectionToDelete?: UseState<string>[1];
 * }>}
 */
export const SideBarContext = createContext({});

const SideBarProvider = (props) => {
  const { children } = props;

  const [collectionToDelete, setCollectionToDelete] = useState("");
  /** @type {React.MutableRefObject<import("tippy.js").Instance>} */
  const openMenuRef = useRef(null);

  return (
    <SideBarContext.Provider
      value={{
        openMenuRef,
        collectionToDelete,
        setCollectionToDelete,
      }}
    >
      {children}
    </SideBarContext.Provider>
  );
};

export default SideBarProvider;
