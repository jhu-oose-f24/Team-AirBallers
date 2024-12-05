import GridItemInfo from "@/components/GridItemInfo";
import { RootContext } from "@/context/RootContext";
import { SideBarContext } from "@/context/SideBarContext";
import css from "@/styles/CollectionPreview.module.css";
import { IconEdit, IconHanger, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

/** @param {CollectionPreviewProps} props */
const CollectionPreview = (props) => {
  const { collection } = props;

  const { sideBarRef } = useContext(RootContext);
  const { openMenuRef, setActiveTask } = useContext(SideBarContext);

  const router = useRouter();

  function generatePreviews() {
    const previews = [];
    const garments = collection?.garments || [];

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

      const imageUrl = garment.images?.slice(-1)?.[0].url;

      previews.push(
        <div
          key={previews.length}
          className={css.preview}
          style={{
            // TODO: set url() from garment
            backgroundImage: imageUrl && `url(${imageUrl})`,
          }}
        >
          {!imageUrl && <IconHanger className={css["image-unknown"]} />}
        </div>,
      );
    }

    while (previews.length < 4) {
      previews.push(<div key={previews.length} className={css.preview} />);
    }

    return previews;
  }

  function onRenameClick() {
    setActiveTask({ collection, action: "rename" });
  }

  function onDeleteClick() {
    setActiveTask({ collection, action: "delete" });
  }

  return (
    <div className={css["preview-card"]}>
      <GridItemInfo
        itemName={collection?.name}
        showMenu={collection?.editable}
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
