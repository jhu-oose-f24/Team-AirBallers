import GridItemInfo from "@/components/GridItemInfo";
import { RootContext } from "@/context/RootContext";
import { SideBarContext } from "@/context/SideBarContext";
import css from "@/styles/CollectionPreview.module.css";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

/** @param {CollectionPreviewProps} props */
const CollectionPreview = (props) => {
  const { garments } = props;

  const { sideBarRef } = useContext(RootContext);
  const { openMenuRef, setActiveTask } = useContext(SideBarContext);

  const router = useRouter();

  const collectionName = "Collection Name"; // TODO: from props

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
            // TODO: set url() from garment
            backgroundImage: null,
          }}
        />,
      );
    }

    while (previews.length < 4) {
      previews.push(<div key={previews.length} className={css.preview} />);
    }

    return previews;
  }

  function onRenameClick() {
    // @ts-ignore TODO: set collection
    setActiveTask({ collection: {}, action: "rename" });
  }

  function onDeleteClick() {
    // @ts-ignore TODO: set collection
    setActiveTask({ collection: {}, action: "delete" });
  }

  return (
    <div className={css["preview-card"]}>
      <GridItemInfo
        itemName={collectionName}
        contextTitle="Collection Options"
        contextOptions={[
          { label: "Rename", icon: <IconEdit />, action: onRenameClick },
          {
            label: "Delete",
            icon: <IconTrash />,
            action: onDeleteClick,
            destructive: true,
          },
        ]}
        openMenuRef={openMenuRef}
        appendTo={sideBarRef}
      />

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
