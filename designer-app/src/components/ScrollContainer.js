"use client";

import { ClickScrollPlugin, OverlayScrollbars } from "overlayscrollbars";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { forwardRef } from "react";

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
    ...otherProps
  } = props;

  const { scrollbars, ...otherOptions } = options || {};

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
        scroll: onScroll,
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
