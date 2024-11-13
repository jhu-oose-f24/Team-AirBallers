import Button from "@/components/Button";
import { RootContext } from "@/components/RootLayout";
import Tooltip from "@/components/Tooltip";
import { IconDotsVertical } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import css from "../styles/CollectionPreview.module.css";

/**
 * @param {{
 *   garments: import("@/components/SideBar").GarmentList;
 * }} props
 */
const CollectionPreview = (props) => {
  const { garments } = props;

  const { sideBarRef } = useContext(RootContext);
  const router = useRouter();
  const [nameRef, setNameRef] = useState(null);

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

        <Button
          variant="hint"
          icon={<IconDotsVertical />}
          // TODO: onClick: collection context menu
          borderRadius="100vmax"
          fontSize="1.1rem"
          xPad="0.2rem"
          yPad="0.2rem"
        />
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
