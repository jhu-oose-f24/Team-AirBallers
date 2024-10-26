"use client";

import Stitches from "@/components/Stitches";
import {
  IconAlertCircle,
  IconEye,
  IconEyeClosed,
  IconLock,
} from "@tabler/icons-react";
import clsx from "clsx";
import React, { useState } from "react";
import css from "../styles/InputField.module.css";

/** @param {InputFieldProps} props */
const InputField = (props) => {
  const {
    id,
    className,
    placeholder,
    value,
    defaultValue,
    label,
    iconLeft,
    iconRight,
    width,
    autoComplete,
    onChange,
    password,
    hideValue,
    disabled,
    readOnly,
    textArea,
    error,
    style,
  } = props;

  const [pwVisible, setPwVisible] = useState(false);
  const pwType = pwVisible ? "text" : "password";

  /** @type {React.MouseEventHandler} */
  function focusOnField(event) {
    const field = event.currentTarget.querySelector("input");
    field?.focus();
  }

  /** @type {React.ChangeEventHandler} */
  function handleOnChange(event) {
    textAreaResize(event.target);
    onChange?.(event);
  }

  /** @param {EventTarget} input */
  function textAreaResize(input) {
    if (!(input instanceof HTMLTextAreaElement)) return;

    input.style.height = "inherit";
    input.style.height = `${input.scrollHeight}px`;
  }

  /** @ts-ignore @type {React.FunctionComponent<GeneralInputProps>} */
  const InputElement = textArea ? "textarea" : "input";

  return (
    <div className={css["input-wrapper"]} style={{ width, ...style }}>
      {label && id ? (
        <label className={css["input-label"]} htmlFor={id}>
          {label}
        </label>
      ) : (
        <span className={css["input-label"]}>{label}</span>
      )}

      <div className={css["input-border"]}>
        <div className={css["input-content"]} onClick={focusOnField}>
          <span className={css["icon-group"]}>{iconLeft}</span>

          <div className={css["field-wrapper"]}>
            <InputElement
              id={id}
              className={clsx(
                className,
                css.field,
                hideValue && css["hide-value"],
              )}
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
            />
            <Stitches type="line" stitchWidth="0.16rem" />
          </div>

          <span className={css["icon-group"]}>
            {!disabled && iconRight}
            {password &&
              value &&
              (pwVisible ? (
                <IconEyeClosed onClick={() => setPwVisible(false)} />
              ) : (
                <IconEye onClick={() => setPwVisible(true)} />
              ))}
            {error && <IconAlertCircle />}
            {disabled && <IconLock />}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InputField;
