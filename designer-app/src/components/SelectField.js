import InputField from "@/components/InputField";
import ScrollContainer from "@/components/ScrollContainer";
import Tooltip from "@/components/Tooltip";
import css from "@/styles/SelectField.module.css";
import { useBodyRef } from "@/util/hooks";
import { pause } from "@/util/misc";
import { IconChevronDown } from "@tabler/icons-react";
import clsx from "clsx";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

/** @type {ForwardRef<SelectFieldProps, HTMLElement>} */
const SelectField = forwardRef((props, ref) => {
  const { options = [], ...otherProps } = props;

  const bodyRef = useBodyRef();

  /** @type {UseState<SelectOption>} */
  const [selectedOption, setSelectedOption] = useState(null);
  const [optionsOpen, setOptionsOpen] = useState(false);
  /** @type {React.MutableRefObject<HTMLDivElement>} */
  const fieldWrapperRef = useRef(null);
  /** @type {React.MutableRefObject<HTMLElement>} */
  const fieldRef = useRef(null);
  /** @type {TooltipRef} */
  const dropdownRef = useRef(null);

  const dropdownWidth = fieldWrapperRef.current?.firstElementChild?.clientWidth;

  useImperativeHandle(ref, () => {
    return fieldRef.current;
  }, []);

  /** @param {SelectOption} option */
  async function optionClick(option) {
    await pause(150);
    setSelectedOption(option);
    dropdownRef.current?.hide();
    await pause(150);
    fieldRef.current?.focus();
  }

  /** @param {React.KeyboardEvent<HTMLElement>} event */
  function optionKeyDown(event) {
    if (event.ctrlKey || event.altKey) return;

    const navKeys = ["Tab", "Enter", "ArrowUp", "ArrowDown", "Escape"];
    if (!navKeys.includes(event.key)) return;

    event.preventDefault();
    event.stopPropagation();

    /** @type {HTMLElement} */
    const option = event.currentTarget;
    if (!option) return;

    switch (event.key) {
      case "Enter":
        option.classList.add(css.clicked);
        option.click();
        pause(200).then(() => {
          option.classList.remove(css.clicked);
        });
        break;

      case "ArrowUp":
        // @ts-ignore
        option?.previousSibling?.focus();
        break;

      case "ArrowDown":
        // @ts-ignore
        option?.nextSibling?.focus();
        break;

      case "Tab":
      case "Escape":
        // @ts-ignore
        dropdownRef.current?.hide();
        fieldRef.current?.focus();
        break;
    }
  }

  /** @param {React.KeyboardEvent<HTMLElement>} event */
  function fieldKeyDown(event) {
    const navKeys = ["Enter", "Escape"];
    if (!navKeys.includes(event.key)) return;

    event.preventDefault();
    event.stopPropagation();

    switch (event.key) {
      case "Enter":
        fieldRef.current?.click();
        break;

      case "Escape":
        if (optionsOpen) {
          dropdownRef.current?.hide();
          fieldRef.current?.focus();
          break;
        }
    }
  }

  /** @param {HTMLElement} list */
  function focusFirstOption(list) {
    if (selectedOption?.id) return;
    // @ts-ignore
    pause(50).then(() => list?.firstChild?.focus());
  }

  /** @param {HTMLElement} option */
  function focusOnOpen(option) {
    if (option?.id !== selectedOption?.id) return;
    pause(50).then(() => option?.focus());
  }

  /** @param {React.MouseEvent<HTMLElement>} event */
  function optionHover(event) {
    event.currentTarget.focus({ preventScroll: true });
  }

  /** @param {SelectOption} option */
  const OptionItem = (option) => {
    if (!selectedOption && option.selected) {
      setSelectedOption(option);
    }

    return (
      <span
        id={option.id}
        className={clsx(
          css.option,
          selectedOption?.id === option.id && css.selected,
        )}
        onClick={() => optionClick(option)}
        onKeyDown={optionKeyDown}
        onMouseMove={optionHover}
        tabIndex={-1}
        ref={focusOnOpen}
      >
        {option.render || option.label}
      </span>
    );
  };

  const optionList = (
    <ScrollContainer className={css["options-wrapper"]}>
      <div className={css["rounded-mask"]} />
      <div className={css["options-list"]} ref={focusFirstOption}>
        {options.map((props, idx) => (
          <OptionItem key={idx} {...props} />
        ))}
      </div>
    </ScrollContainer>
  );

  return (
    <Tooltip
      className={css.dropdown}
      content={optionList}
      interactive
      placement="bottom"
      onCreate={(inst) => (dropdownRef.current = inst)}
      onShow={() => setOptionsOpen(true)}
      onHide={() => setOptionsOpen(false)}
      arrow={false}
      maxWidth={dropdownWidth && `${dropdownWidth}px`}
      delay={0}
      duration={[100, 0]}
      trigger="click"
      reference={fieldWrapperRef.current?.firstElementChild}
      appendTo={bodyRef}
    >
      <div
        className={clsx(css["select-field"], optionsOpen && css.open)}
        onKeyDown={fieldKeyDown}
        ref={fieldWrapperRef}
      >
        <InputField
          iconRight={<IconChevronDown className={css["select-arrow"]} />}
          value={selectedOption?.label || ""}
          readOnly
          {...otherProps}
          ref={fieldRef}
        />
      </div>
    </Tooltip>
  );
});

export default SelectField;
