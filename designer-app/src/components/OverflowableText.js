import Tooltip from "@/components/Tooltip";
import { useOnResize } from "@/util/hooks";
import { pause } from "@/util/misc";
import clsx from "clsx";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

/** @type {ForwardRef<OverflowableTextProps, HTMLElement>} */
const OverflowableText = forwardRef((props, ref) => {
  const { className, text, as: Element = "span", ...tippyProps } = props;

  const [textRef, setTextRef] = useState(null);
  const [tooltipDisabled, setTooltipDisabled] = useState(false);

  useImperativeHandle(ref, () => {
    return textRef;
  }, [textRef]);

  useOnResize(() => {
    if (!textRef) return;
    setTooltipDisabled(textRef?.offsetWidth >= textRef?.scrollWidth);
  }, [text, textRef]);

  useEffect(() => {
    if (!textRef) return;
    pause(100).then(() => {
      setTooltipDisabled(textRef?.offsetWidth >= textRef?.scrollWidth);
    });
  }, [text, textRef]);

  return (
    <Tooltip
      content={text}
      maxWidth="15rem"
      disabled={tooltipDisabled}
      delay={[500, 0]}
      offset={[0, 5]}
      hideAfterMS={3000}
      hideOnClick
      {...tippyProps}
    >
      <Element
        // @ts-ignore
        className={clsx(
          className,
          "overflow-hidden",
          "whitespace-nowrap",
          "text-ellipsis",
        )}
        ref={setTextRef}
      >
        {text}
      </Element>
    </Tooltip>
  );
});

export default OverflowableText;
