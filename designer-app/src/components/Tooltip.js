"use client";

import Tippy from "@tippyjs/react";
import clsx from "clsx";
import { forwardRef } from "react";

/** @type {ForwardRef<TooltipProps, Element>} */
const Tooltip = forwardRef((props, ref) => {
  const { className, children, ...otherProps } = props;

  /** @ts-ignore @type {Tippy} */
  const TippyComponent = Tippy.default ?? Tippy;

  return (
    <TippyComponent
      className={clsx("tooltip", className)}
      delay={[200, 500]}
      duration={150}
      appendTo="parent"
      {...otherProps}
      ref={ref}
    >
      {children}
    </TippyComponent>
  );
});

export default Tooltip;
