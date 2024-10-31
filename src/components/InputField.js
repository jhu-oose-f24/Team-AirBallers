"use client";

import Stitches from "@/components/Stitches";
import Tooltip from "@/components/Tooltip";
import { paletteFrom } from "@/util/tint";
import {
  IconAlertCircleFilled,
  IconEye,
  IconEyeClosed,
  IconLock,
} from "@tabler/icons-react";
import clsx from "clsx";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useEffect, useState } from "react";
import css from "../styles/InputField.module.css";

/** @param {InputFieldProps} props */
const InputField = (props) => {
  const {
    id,
    className,
    placeholder,
    value,
    defaultValue,
    autoComplete,

    label,
    iconLeft,
    iconRight,

    width,

    onChange,
    disabled,
    readOnly,
    error,

    password,
    hideValue,

    textArea,
    wrapText,

    style,
  } = props;

  const [pwVisible, setPwVisible] = useState(false);

  /** @type {UseState<Element>} */
  const [fieldRef, setFieldRef] = useState(null);
  /** @type {UseState<Element>} */
  const [rootRef, setRootRef] = useState(null);
  /** @type {UseState<Element>} */
  const [iconsRightRef, setIconsRightRef] = useState(null);
  const [scrollerInit, setScrollerInit] = useState(false);

  /** @type {CustomCSSProperties} */
  const tintPalette = paletteFrom(error && "crimson");

  const pwType = pwVisible ? "text" : "password";

  const icons = [iconLeft, iconRight];
  const inputState = [disabled, password, pwVisible, error];
  useEffect(() => {
    textAreaResize(fieldRef);
  }, [fieldRef, width, ...icons, ...inputState]);

  /** @type {React.MouseEventHandler} */
  function focusOnField() {
    /** @type {HTMLInputElement | HTMLTextAreaElement} */
    const field = rootRef.querySelector("input, textarea");
    field?.focus();
  }

  /** @type {React.ChangeEventHandler} */
  function handleOnChange(event) {
    textAreaResize(event.target);
    onChange?.(event);
  }

  /** @param {EventTarget} input */
  function textAreaResize(input) {
    if (!wrapText || !(input instanceof HTMLTextAreaElement)) return;

    const inputScroll = input.parentElement;
    const prevScroll = inputScroll?.scrollTop;

    input.style.height = "inherit";
    input.style.height = `${input.scrollHeight}px`;

    if (prevScroll) inputScroll.scrollTo({ top: prevScroll });
  }

  /** @type {TooltipOffset} */
  function getTooltipOffset() {
    const { y: iconsY } = iconsRightRef?.getBoundingClientRect();
    const { y: fieldY } = rootRef?.getBoundingClientRect();

    return [0, 15 + iconsY - fieldY];
  }

  /** @param {import("overlayscrollbars").OverlayScrollbars} ref */
  function initializeScroller(ref) {
    const root = ref?.elements?.()?.host;
    if (!root) return;

    setScrollerInit(true);
  }

  /** @ts-ignore @type {GeneralInput} */
  const InputElement = textArea ? "textarea" : "input";

  return (
    <div
      className={clsx(css["input-wrapper"], className)}
      style={{ width, ...style, ...tintPalette }}
      ref={setRootRef}
    >
      {label &&
        (id ? (
          <label className={css["input-label"]} htmlFor={id}>
            {label}
          </label>
        ) : (
          <span className={css["input-label"]}>{label}</span>
        ))}

      <div className={css["input-border"]}>
        <div className={css["input-content"]} onClick={focusOnField}>
          <span className={css["icon-group"]}>{iconLeft}</span>

          <div className={css["field-wrapper"]}>
            <OverlayScrollbarsComponent
              className={css.scroller}
              options={{
                overflow: {
                  x: "hidden",
                  y: textArea ? "scroll" : "hidden",
                },
                scrollbars: {
                  autoHide: "scroll",
                },
                paddingAbsolute: true,
              }}
              events={{
                initialized: initializeScroller,
                updated: () => textAreaResize(fieldRef),
              }}
              style={{
                marginBottom: !scrollerInit && textArea && "-8px",
                opacity: +scrollerInit,
              }}
              defer
            >
              <InputElement
                id={id}
                className={clsx(css.field, hideValue && css["hide-value"])}
                rows={1}
                placeholder={placeholder}
                value={value}
                onChange={handleOnChange}
                onKeyDown={(e) => textAreaResize(e.target)}
                type={password ? pwType : undefined}
                defaultValue={defaultValue}
                autoComplete={autoComplete}
                disabled={disabled}
                readOnly={readOnly}
                ref={setFieldRef}
              />
            </OverlayScrollbarsComponent>
            <Stitches type="line" stitchWidth="0.16rem" />
          </div>

          <span className={css["icon-group"]} ref={setIconsRightRef}>
            {!disabled && iconRight}
            {password &&
              value &&
              (pwVisible ? (
                <IconEyeClosed onClick={() => setPwVisible(false)} />
              ) : (
                <IconEye onClick={() => setPwVisible(true)} />
              ))}
            {error && (
              <Tooltip
                disabled={!rootRef}
                content={error}
                appendTo={rootRef}
                placement="top-end"
                trigger="mouseenter click"
                offset={getTooltipOffset}
              >
                <IconAlertCircleFilled
                  className="cursor-pointer"
                  tabIndex={-1}
                  onClick={(e) => e.stopPropagation()}
                />
              </Tooltip>
            )}
            {disabled && <IconLock />}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InputField;
