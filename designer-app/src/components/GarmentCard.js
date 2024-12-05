import GridItemInfo from "@/components/GridItemInfo";
import { RootContext } from "@/context/RootContext";
import css from "@/styles/GarmentCard.module.css";
import ItemToURL from "@/types/GarmentEncoder";
import {
  IconHanger,
  IconPencil,
  IconReplace,
  IconTrash,
} from "@tabler/icons-react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

/** @param {GarmentCardProps} props */
const GarmentCard = (props) => {
  const { garment } = props;

  const router = useRouter();

  const { bodyRef, openMenuRef, setActiveTask } = useContext(RootContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const imageUrl = garment?.images?.slice(-1)?.[0]?.url;

  function onMoveClick() {
    // @ts-ignore TODO: set collection
    setActiveTask({ garment: {}, action: "move" });
  }

  function onRenameClick() {
    // @ts-ignore TODO: set collection
    setActiveTask({ garment: {}, action: "rename" });
  }

  function onDeleteClick() {
    // @ts-ignore TODO: set collection
    setActiveTask({ garment: {}, action: "delete" });
  }

  function goToEditGarment() {
    if (!garment?.id) return;

    const encodedId = ItemToURL.encode(garment.id);
    router.push(`/garment/${encodedId}/edit`);
  }

  return (
    <div className={css["garment-card"]}>
      <div
        className={clsx(css.frame, menuOpen && css["menu-open"])}
        onClick={goToEditGarment}
      >
        <div
          className={css.thumb}
          style={{ backgroundImage: imageUrl && `url(${imageUrl})` }}
        >
          {!imageUrl && <IconHanger className={css["no-thumb"]} />}
        </div>
        <div className={css["edit-icon"]}>
          <IconPencil stroke={2.5} />
        </div>
      </div>

      <GridItemInfo
        itemName={garment?.name || "Untitled"}
        contextTitle="Garment Options"
        contextOptions={[
          { label: "Move", icon: <IconReplace />, action: onMoveClick },
          { label: "Rename", action: onRenameClick },
          {
            label: "Delete",
            icon: <IconTrash />,
            action: onDeleteClick,
            destructive: true,
          },
        ]}
        openMenuRef={openMenuRef}
        onMenuOpen={() => setMenuOpen(true)}
        onMenuClose={() => setMenuOpen(false)}
        appendTo={bodyRef}
        menuPlacement="right-end"
        nameoverflowPlacement="bottom-start"
      />
    </div>
  );
};

export default GarmentCard;
