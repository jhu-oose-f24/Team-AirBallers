"use client";

import { RootContext } from "@/context/RootContext";
import { pause } from "@/util/misc";
import { ClickScrollPlugin, OverlayScrollbars } from "overlayscrollbars";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { forwardRef, useContext } from "react";

/** @type {ForwardRef<ScrollContainerProps, ScrollContainerRef>} */
const ScrollContainer = forwardRef((props, ref) => {
  const {
    className,
    children,
    options,
    onScroll,
    onInitialized,
    onUpdated,
    onDestroyed,
    manageMenuSingleton,
    ...otherProps
  } = props;

  const { scrollbars, ...otherOptions } = options || {};

  const { openMenuRef } = useContext(RootContext);

  async function hideOpenMenu() {
    const lastOpen = openMenuRef?.current;
    await pause(100);
    lastOpen?.state.isShown && lastOpen?.hide();
  }

  OverlayScrollbars.plugin(ClickScrollPlugin);

  return (
    <OverlayScrollbarsComponent
      className={className}
      options={{
        ...otherOptions,

        scrollbars: {
          ...scrollbars,

          clickScroll: true,
          autoHide: "scroll",
        },
      }}
      events={{
        initialized: onInitialized,
        updated: onUpdated,
        scroll: manageMenuSingleton && openMenuRef ? hideOpenMenu : onScroll,
        destroyed: onDestroyed,
      }}
      defer
      {...otherProps}
      ref={ref}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
});

export default ScrollContainer;
