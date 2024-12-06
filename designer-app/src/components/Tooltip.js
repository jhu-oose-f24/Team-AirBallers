import Tippy from "@tippyjs/react";
import clsx from "clsx";
import { useRef } from "react";

/** @param {TooltipProps} props */
const Tooltip = (props) => {
  const { hideAfterMS = -1, children, ...tippyProps } = props;
  const { className, onShow, onHide, ...otherProps } = tippyProps;

  const hideTimeout = useRef(null);

  /** @ts-ignore @type {Tippy} */
  const TippyComponent = Tippy.default ?? Tippy;

  /** @type {typeof onShow} */
  function showTooltip(inst) {
    onShow?.(inst);
    if (hideAfterMS <= 0) return;

    hideTimeout.current = setTimeout(() => {
      if (!inst?.state.isDestroyed) inst.hide();
    }, hideAfterMS);
  }

  /** @type {typeof onHide} */
  function hideTooltip(inst) {
    onHide?.(inst);
    clearTimeout(hideTimeout.current);
    hideTimeout.current = null;
  }

  return (
    <TippyComponent
      className={clsx("tooltip", className)}
      delay={[200, 500]}
      duration={150}
      appendTo="parent"
      onShow={showTooltip}
      onHide={hideTooltip}
      trigger="mouseenter click"
      {...otherProps}
    >
      {children}
    </TippyComponent>
  );
};

export default Tooltip;
