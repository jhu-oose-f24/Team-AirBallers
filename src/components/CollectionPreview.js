import Button from "@/components/Button";
import { IconDotsVertical } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import css from "../styles/CollectionPreview.module.css";

/**
 * @param {{
 *   garments: import("@/components/SideBar").GarmentList;
 * }} props
 */
const CollectionPreview = (props) => {
  const router = useRouter();

  const { garments } = props;

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

  return (
    <div className={css["preview-card"]}>
      <div className={css["card-header"]}>
        <span className={css["collection-name"]}>Collection Name</span>

        <Button
          variant="hint"
          icon={<IconDotsVertical />}
          // TODO: onClick
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
