"use client";

import { ClickScrollPlugin, OverlayScrollbars } from "overlayscrollbars";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

/** @type {OverlayScrollbarsComponent} */
const ScrollContainer = (props) => {
  const { className, children, options } = props;

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
      defer
    >
      {children}
    </OverlayScrollbarsComponent>
  );
};

export default ScrollContainer;
