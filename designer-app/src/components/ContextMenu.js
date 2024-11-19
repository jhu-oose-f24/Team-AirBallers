import Tooltip from "@/components/Tooltip";
import css from "@/styles/ContextMenu.module.css";
import { pause } from "@/util/misc";
import { paletteFrom } from "@/util/tint";
import { IconQuestionMark } from "@tabler/icons-react";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

/** @param {ContextMenuProps} props */
const ContextMenu = (props) => {
  const { children, title, options, ...otherProps } = props;

  const [menuOptions, setMenuOptions] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const updatedOptions = options?.map((option, idx) => (
      <div
        key={idx}
        className={clsx(css.option, option.destructive && css.destructive)}
        onClick={(e) => menuClick(e, option.action)}
        style={{ ...paletteFrom(option.destructive && "red") }}
      >
        {option.icon || <IconQuestionMark opacity={0} />}
        <span>{option.label}</span>
      </div>
    ));

    setMenuOptions(updatedOptions);
  }, [options]);

  /**
   * @param {React.MouseEvent} event
   * @param {React.MouseEventHandler} action
   */
  async function menuClick(event, action) {
    menuRef.current?.hide();
    await pause(200);
    action?.(event);
  }

  /** @type {TooltipOffset} */
  function getTooltipOffset({ placement }) {
    return [placement.includes("start") ? 15 : -15, 20];
  }

  return (
    <Tooltip
      className={css["context-menu"]}
      interactive
      onCreate={(inst) => (menuRef.current = inst)}
      content={
        <>
          <span className={css.header}>{title}</span>
          <span className={css.separator} />
          {menuOptions}
        </>
      }
      trigger="click"
      onClickOutside={(inst) => inst.hide()}
      arrow={false}
      offset={getTooltipOffset}
      delay={0}
      {...otherProps}
    >
      {children}
    </Tooltip>
  );
};

export default ContextMenu;
