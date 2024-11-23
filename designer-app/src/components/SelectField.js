import InputField from "@/components/InputField";
import ScrollContainer from "@/components/ScrollContainer";
import Tooltip from "@/components/Tooltip";
import css from "@/styles/SelectField.module.css";
import { useBodyRef } from "@/util/hooks";
import { pause } from "@/util/misc";
import { IconChevronDown } from "@tabler/icons-react";
import clsx from "clsx";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

/** @type {ForwardRef<SelectFieldProps, HTMLElement>} */
const SelectField = forwardRef((props, ref) => {
  const { options = [], value, onChange, ...otherProps } = props;

  const bodyRef = useBodyRef();

  /** @type {UseState<SelectOptionMap>} */
  const [parsedOptions, setParsedOptions] = useState({});
  const [optionsOpen, setOptionsOpen] = useState(false);
  /** @type {React.MutableRefObject<HTMLDivElement>} */
  const fieldWrapperRef = useRef(null);
  /** @type {React.MutableRefObject<HTMLElement>} */
  const fieldRef = useRef(null);
  /** @type {TooltipRef} */
  const dropdownRef = useRef(null);

  const fieldRoot = fieldWrapperRef.current?.firstElementChild;
  const dropdownWidth = fieldRoot?.clientWidth;

  useImperativeHandle(ref, () => {
    return fieldRef.current;
  }, []);

  useEffect(() => {
    setParsedOptions(
      options.reduce((map, { value, ...option }) => {
        map[value] = option;
        return map;
      }, {}),
    );
  }, [options]);

  /** @param {React.MouseEvent} event */
  async function optionClick(event) {
    await pause(150);
    onChange?.(event);
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
    switch (event.key) {
      case "Enter":
        event.preventDefault();
        event.stopPropagation();
        fieldRef.current?.click();
        break;

      case "Escape":
        if (optionsOpen) {
          event.preventDefault();
          event.stopPropagation();
          dropdownRef.current?.hide();
          fieldRef.current?.focus();
          break;
        }
    }
  }

  /** @param {HTMLElement} list */
  function focusFirstOption(list) {
    if (value) return;
    // @ts-ignore
    pause(50).then(() => list?.firstChild?.focus());
  }

  /** @param {HTMLElement & { value: string }} option */
  function focusOnOpen(option) {
    const thisValue = option?.value;
    if (!value && parsedOptions[thisValue]?.selected) {
      option.click();
    }
    if (thisValue !== value) return;

    pause(50).then(() => option?.focus());
  }

  /** @param {React.MouseEvent<HTMLElement>} event */
  function optionHover(event) {
    event.currentTarget.focus({ preventScroll: true });
  }

  /** @param {SelectOption} option */
  const OptionItem = (option) => {
    return (
      <button
        className={clsx(css.option, value === option.value && css.selected)}
        onClick={optionClick}
        value={option.value}
        onKeyDown={optionKeyDown}
        onMouseMove={optionHover}
        tabIndex={-1}
        ref={focusOnOpen}
      >
        {option.render || option.label}
      </button>
    );
  };

  const optionList = (
    <ScrollContainer className={css["options-wrapper"]}>
      <div className={css["rounded-mask"]} />
      <div className={css["options-list"]} ref={focusFirstOption}>
        {Object.entries(parsedOptions).map(([value, attrs], idx) => (
          <OptionItem key={idx} value={value} {...attrs} />
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
      reference={fieldRoot}
      appendTo={bodyRef}
    >
      <div
        className={clsx(css["select-field"], optionsOpen && css.open)}
        onKeyDown={fieldKeyDown}
        ref={fieldWrapperRef}
      >
        <InputField
          iconRight={<IconChevronDown className={css["select-arrow"]} />}
          value={parsedOptions[value]?.label || ""}
          readOnly
          {...otherProps}
          ref={fieldRef}
        />
      </div>
    </Tooltip>
  );
});

export default SelectField;
