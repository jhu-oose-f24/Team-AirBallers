"use client";

import ScrollContainer from "@/components/ScrollContainer";
import Stitches from "@/components/Stitches";
import Tooltip from "@/components/Tooltip";
import css from "@/styles/InputField.module.css";
import { useBodyRef } from "@/util/hooks";
import { paletteFrom } from "@/util/tint";
import {
  IconAlertCircleFilled,
  IconEye,
  IconEyeClosed,
  IconLock,
} from "@tabler/icons-react";
import clsx from "clsx";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

/** @type {ForwardRef<InputFieldProps, HTMLElement>} */
const InputField = forwardRef((props, ref) => {
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

  const documentBody = useBodyRef();

  const [pwVisible, setPwVisible] = useState(false);

  /** @type {UseState<HTMLElement>} */
  const [labelRef, setLabelRef] = useState(null);
  /** @type {UseState<HTMLElement>} */
  const [fieldRef, setFieldRef] = useState(null);
  /** @type {UseState<HTMLElement>} */
  const [rootRef, setRootRef] = useState(null);
  /** @type {UseState<HTMLElement>} */
  const [iconsRightRef, setIconsRightRef] = useState(null);

  const icons = [iconLeft, iconRight];
  const inputState = [disabled, password, pwVisible, error];
  const pwType = pwVisible ? "text" : "password";

  useImperativeHandle(ref, () => {
    return fieldRef;
  }, [fieldRef]);

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
    const labelHeight = labelRef?.clientHeight || 0;

    return [0, 15 + iconsY - fieldY - labelHeight];
  }

  /** @ts-ignore @type {GeneralInput} */
  const InputElement = textArea ? "textarea" : "input";

  return (
    <div
      className={clsx(css["input-wrapper"], className)}
      style={{ width, ...style, ...paletteFrom(error && "red") }}
      ref={setRootRef}
    >
      {label &&
        (id ? (
          <label className={css["input-label"]} htmlFor={id} ref={setLabelRef}>
            {label}
          </label>
        ) : (
          <span className={css["input-label"]} ref={setLabelRef}>
            {label}
          </span>
        ))}

      <div className={css["input-border"]}>
        <div className={css["input-content"]} onClick={focusOnField}>
          <span className={css["icon-group"]}>{iconLeft}</span>

          <div className={css["field-wrapper"]}>
            <ScrollContainer
              className={css.scroller}
              options={{
                overflow: {
                  x: "hidden",
                  y: textArea ? "scroll" : "hidden",
                },
                scrollbars: {
                  visibility: value ? "auto" : "hidden",
                },
              }}
              onUpdated={() => textAreaResize(fieldRef)}
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
            </ScrollContainer>
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
                appendTo={documentBody}
                placement="top-end"
                trigger="mouseenter click"
                offset={getTooltipOffset}
                onCreate={(inst) => {
                  if (!inst?.popper) return;

                  const palette = paletteFrom("red");
                  for (let colorVar in palette) {
                    inst.popper.style.setProperty(colorVar, palette[colorVar]);
                  }
                }}
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
});

export default InputField;
