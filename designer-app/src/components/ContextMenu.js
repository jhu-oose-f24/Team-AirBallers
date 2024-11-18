import Tooltip from "@/components/Tooltip";
import { IconQuestionMark } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import css from "../styles/ContextMenu.module.css";

/** @param {ContextMenuProps} props */
const ContextMenu = (props) => {
  const { children, options, ...otherProps } = props;

  const [menuOptions, setMenuOptions] = useState(null);

  useEffect(() => {
    const updatedOptions = options?.map(({ label, icon, action }, idx) => (
      <div key={idx} className={css.option} onClick={action}>
        {icon || <IconQuestionMark opacity={0} />}
        <span>{label}</span>
      </div>
    ));

    setMenuOptions(updatedOptions);
  }, [options]);

  const menuTitle = <span className={css.header}>Collection Options</span>;

  return (
    <Tooltip
      className={css["context-menu"]}
      interactive
      content={
        <>
          {menuTitle}
          <span className={css.separator} />
          {menuOptions}
        </>
      }
      placement="right-start"
      popperOptions={{
        modifiers: [
          { name: "flip", options: { flipVariations: false } },
          { name: "preventOverflow", options: { mainAxis: false } },
        ],
      }}
      trigger="click"
      arrow={false}
      offset={[15, 20]}
      delay={0}
      {...otherProps}
    >
      {children}
    </Tooltip>
  );
};

export default ContextMenu;
