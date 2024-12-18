import Tooltip from "@/components/Tooltip";
import css from "@/styles/ContextMenu.module.css";
import { pause } from "@/util/misc";
import { dangerPalette } from "@/util/tint";
import { IconQuestionMark } from "@tabler/icons-react";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

/** @param {ContextMenuProps} props */
const ContextMenu = (props) => {
  const { children, title, options, ...otherProps } = props;

  const [menuOptions, setMenuOptions] = useState(null);
  /** @type {React.MutableRefObject<NodeListOf<HTMLElement>>} */
  const optionEltsRef = useRef(null);
  /** @type {React.MutableRefObject<HTMLElement>} */
  const headerRef = useRef(null);
  /** @type {TooltipRef} */
  const menuRef = useRef(null);

  useEffect(() => {
    const updatedOptions = options?.map((option, idx) => (
      <div
        key={idx}
        className={clsx(css.option, option.destructive && css.destructive)}
        onClick={(e) => menuClick(e, option.action)}
        onMouseMove={(e) => {
          e.currentTarget.classList.add(css["opt-hover"]);
          e.currentTarget.focus();
        }}
        onMouseOver={(e) => e.currentTarget.focus()}
        onMouseOut={(e) => {
          e.currentTarget.classList.remove(css["opt-hover"]);
          headerRef.current?.focus();
        }}
        onKeyDown={optionKeyDown}
        style={option.destructive && dangerPalette}
        tabIndex={0}
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

  /** @type {TooltipProps["onMount"]} */
  async function focusMenu(inst) {
    if (!inst) return;

    /** @type {HTMLElement} */
    const header = inst.popper?.querySelector(`.${css.header}`);
    headerRef.current = header;
    header?.focus();

    /** @type {typeof optionEltsRef.current} */
    const options = inst.popper?.querySelectorAll(`.${css.option}`);
    optionEltsRef.current = options;
  }

  /** @type {React.KeyboardEventHandler<HTMLElement>} */
  function optionKeyDown(event) {
    switch (event.key) {
      case "Enter":
        event.currentTarget.click();
        break;

      case "ArrowUp":
        // @ts-ignore
        event.currentTarget?.previousSibling?.focus();
        event.currentTarget?.classList.remove(css["opt-hover"]);
        break;

      case "ArrowDown":
        // @ts-ignore
        event.currentTarget?.nextSibling?.focus();
        event.currentTarget?.classList.remove(css["opt-hover"]);
        break;

      case "Tab":
        event.preventDefault();
        break;

      case "Escape":
        menuRef.current?.hide();
        // @ts-ignore
        menuRef.current?.reference?.focus?.();
        break;
    }
  }

  /** @type {React.KeyboardEventHandler<HTMLElement>} */
  function headerKeyDown(event) {
    switch (event.key) {
      case "ArrowDown":
        optionEltsRef.current?.[0]?.focus();
        break;

      case "Tab":
        event.preventDefault();
        break;

      case "Escape":
        menuRef.current?.hide();
        // @ts-ignore
        menuRef.current?.reference?.focus?.();
        break;
    }
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
      onMount={focusMenu}
      content={
        <>
          <span className={css.header} onKeyDown={headerKeyDown} tabIndex={0}>
            {title}
          </span>
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
