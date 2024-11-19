import GridItemInfo from "@/components/GridItemInfo";
import { RootContext } from "@/context/RootContext";
import css from "@/styles/GarmentCard.module.css";
import { useBodyRef } from "@/util/hooks";
import { IconPencil, IconReplace, IconTrash } from "@tabler/icons-react";
import { useContext } from "react";

/** @param {GarmentCardProps} props */
const GarmentCard = (props) => {
  const { garment } = props;

  const { openMenuRef, setActiveTask } = useContext(RootContext);

  const documentBody = useBodyRef();

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

  return (
    <div className={css["garment-card"]}>
      <div className={css.frame}>
        <div
          className={css.thumb}
          style={{
            // TODO: set url() from garment
            backgroundImage: null,
          }}
        />
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
        appendTo={documentBody}
        menuPlacement="right-end"
        nameoverflowPlacement="bottom-start"
      />
    </div>
  );
};

export default GarmentCard;
