import Button from "@/components/Button";
import ContextMenu from "@/components/ContextMenu";
import Tooltip from "@/components/Tooltip";
import { RootContext } from "@/context/RootContext";
import { SideBarContext } from "@/context/SideBarContext";
import { pause } from "@/util/misc";
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import css from "../styles/CollectionPreview.module.css";

/** @param {CollectionPreviewProps} props */
const CollectionPreview = (props) => {
  const { garments } = props;

  const { sideBarRef } = useContext(RootContext);
  const { openMenuRef, setCollectionToDelete } = useContext(SideBarContext);
  const router = useRouter();

  const [nameRef, setNameRef] = useState(null);
  /** @type {UseState<import("tippy.js").Instance>} */
  const [contextMenu, setContextMenu] = useState(null);

  const collectionName = "Collection Name"; // TODO: from props
  const overflownName = nameRef?.clientWidth < nameRef?.scrollWidth;

  function generatePreviews() {
    const previews = [];

    for (let garment of garments) {
      if (previews.length >= 4) break;

      if (previews.length >= 3 && garments.length > 4) {
        previews.push(
          <div key="more" className={css.preview}>
            <span>+{garments.length - 3}</span>
          </div>,
        );

        break;
      }

      previews.push(
        <div
          key={previews.length}
          className={css.preview}
          style={{
            backgroundImage: `url(${garment.imageURL})`,
          }}
        />,
      );
    }

    while (previews.length < 4) {
      previews.push(<div key={previews.length} className={css.preview} />);
    }

    return previews;
  }

  /** @type {TooltipOffset} */
  function getTooltipOffset() {
    /** @type {HTMLElement} */
    const name = nameRef;

    const nameRect = name?.getBoundingClientRect();
    const headerRect = name?.parentElement.getBoundingClientRect();

    return [0, 15 + headerRect.width - nameRect.width];
  }

  async function onMenuClick() {
    contextMenu?.hide();
    await pause(200);
  }

  async function onRenameClick() {
    await onMenuClick();
    // TODO
  }

  async function onDeleteClick() {
    await onMenuClick();
    // TODO: set collection id
    setCollectionToDelete("collectionId");
  }

  return (
    <div className={css["preview-card"]}>
      <div className={css["card-header"]}>
        <Tooltip
          disabled={!overflownName}
          content={collectionName}
          placement="right"
          appendTo={sideBarRef || "parent"}
          maxWidth="12rem"
          delay={[500, 0]}
          offset={getTooltipOffset}
        >
          <span className={css["collection-name"]} ref={setNameRef}>
            {collectionName}
          </span>
        </Tooltip>

        <ContextMenu
          onCreate={(inst) => setContextMenu(inst)}
          onShown={() => (openMenuRef.current = contextMenu)}
          onHide={() => (openMenuRef.current = null)}
          options={[
            { label: "Rename", icon: <IconEdit />, action: onRenameClick },
            { label: "Delete", icon: <IconTrash />, action: onDeleteClick },
          ]}
          appendTo={sideBarRef || "parent"}
        >
          <Button
            variant="hint"
            icon={<IconDotsVertical />}
            borderRadius="100vmax"
            fontSize="1.1rem"
            xPad="0.2rem"
            yPad="0.2rem"
          />
        </ContextMenu>
      </div>

      <div
        className={css["garment-grid"]}
        // TODO: go to specific collection
        onClick={() => router.push("/collection")}
      >
        {generatePreviews()}
      </div>
    </div>
  );
};

export default CollectionPreview;
