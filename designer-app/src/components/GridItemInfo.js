import Button from "@/components/Button";
import ContextMenu from "@/components/ContextMenu";
import OverflowableText from "@/components/OverflowableText";
import css from "@/styles/GridItemInfo.module.css";
import { IconDotsVertical } from "@tabler/icons-react";
import { useState } from "react";

/** @param {GridItemInfoProps} props */
const GridItemInfo = (props) => {
  const {
    itemName,
    showMenu,
    contextTitle,
    contextOptions,
    openMenuRef,
    appendTo,
    onMenuOpen,
    onMenuClose,
    menuPlacement = "right-start",
    nameoverflowPlacement = "right",
  } = props;

  const [nameRef, setNameRef] = useState(null);

  /** @type {TooltipOffset} */
  function getTooltipOffset({ placement }) {
    if (!placement.includes("right")) return [0, 10];

    /** @type {HTMLElement} */
    const name = nameRef;

    const nameRect = name?.getBoundingClientRect();
    const headerRect = name?.parentElement.getBoundingClientRect();

    return [0, 15 + headerRect?.width - nameRect?.width];
  }

  return (
    <div className={css["grid-item-info"]}>
      <OverflowableText
        className={css["item-name"]}
        text={itemName}
        placement={nameoverflowPlacement}
        appendTo={appendTo}
        offset={getTooltipOffset}
        ref={setNameRef}
      />

      {showMenu && (
        <ContextMenu
          onShow={onMenuOpen}
          onShown={(inst) => {
            openMenuRef.current?.hide();
            openMenuRef.current = inst;
          }}
          onHide={() => (openMenuRef.current = null)}
          onHidden={onMenuClose}
          title={contextTitle}
          options={contextOptions}
          appendTo={appendTo || "parent"}
          placement={menuPlacement}
        >
          <Button
            variant="hint"
            className={css["ctx-menu-icon"]}
            icon={<IconDotsVertical />}
            borderRadius="100vmax"
            fontSize="1.1rem"
            xPad="0.2rem"
            yPad="0.2rem"
          />
        </ContextMenu>
      )}
    </div>
  );
};

export default GridItemInfo;
