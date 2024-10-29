"use client";

import Stitches from "@/components/Stitches";
import Tooltip from "@/components/Tooltip";
import { useOnResize } from "@/util/hooks";
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

  /** @type {UseState<CustomCSSProperties>} */
  const [tintPalette, setTintPalette] = useState({});
  const [pwVisible, setPwVisible] = useState(false);

  /** @type {UseState<Element>} */
  const [fieldRef, setFieldRef] = useState(null);
  /** @type {UseState<Element>} */
  const [rootRef, setRootRef] = useState(null);
  /** @type {UseState<Element>} */
  const [iconsRightRef, setIconsRightRef] = useState(null);

  const pwType = pwVisible ? "text" : "password";

  useOnResize(() => textAreaResize(fieldRef), [fieldRef]);

  useEffect(() => {
    setTintPalette(paletteFrom(error && "crimson"));
  }, [error]);

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
  function getTooltipOffset({ placement }) {
    let skidding = 0;
    let distance = 15;

    if (placement.includes("start")) {
      skidding = -10;
    } else if (placement.includes("end")) {
      skidding = 10;
    }

    const { y: iconsY } = iconsRightRef?.getBoundingClientRect();
    const { y: fieldY } = rootRef?.getBoundingClientRect();
    distance += iconsY - fieldY;

    return [skidding, distance];
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
                hideOnClick
                placement="top-end"
                offset={getTooltipOffset}
              >
                <IconAlertCircleFilled className="cursor-pointer" />
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
