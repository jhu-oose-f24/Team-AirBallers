import GridItemInfo from "@/components/GridItemInfo";
import { RootContext } from "@/context/RootContext";
import { SideBarContext } from "@/context/SideBarContext";
import css from "@/styles/CollectionPreview.module.css";
import ItemToURL from "@/types/GarmentEncoder";
import { IconEdit, IconHanger, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

/** @param {CollectionPreviewProps} props */
const CollectionPreview = (props) => {
  const { collection } = props;

  const router = useRouter();

  const { sideBarRef } = useContext(RootContext);
  const { openMenuRef, setActiveTask } = useContext(SideBarContext);

  const [garments, setGarments] = useState([]);

  useEffect(() => {
    const newGarments = collection?.garments || [];
    setGarments([...newGarments].reverse());
  }, [collection]);

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

      const imageUrl = garment.images?.slice(-1)?.[0]?.url;

      previews.push(
        <div
          key={previews.length}
          className={css.preview}
          style={{ backgroundImage: imageUrl && `url(${imageUrl})` }}
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

  function goToCollection() {
    if (!collection?.id) return;

    const collectionURL = ItemToURL.encode(collection.id);
    if (!collectionURL) return;

    router.push(`/collection/${collectionURL}`);
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
        onClick={goToCollection}
      >
        {generatePreviews()}
      </div>
    </div>
  );
};

export default CollectionPreview;
