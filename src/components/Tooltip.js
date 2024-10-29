"use client";

import Tippy from "@tippyjs/react";
import clsx from "clsx";

/** @param {import("@tippyjs/react").TippyProps} props */
const Tooltip = (props) => {
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
    >
      {children}
    </TippyComponent>
  );
};

export default Tooltip;
