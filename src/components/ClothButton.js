import clsx from "clsx";
import css from "../styles/ClothButton.module.css";

/** @param {ClothButtonProps} props */
const ClothButton = (props) => {
  const { height, type, onClick } = props;

  return (
    <div className={css["btn-wrapper"]}>
      <button
        className={clsx(css["btn"], css["clothing"], css[type])}
        tabIndex={-1}
      >
        <div className={css["outer"]} style={{ height }} onClick={onClick}>
          <div className={css["gradient"]} />

          <div className={css["inner"]}>
            <div className={css["gradient"]} />

            <div className={css["slit"]} />
            <div className={css["slit"]} />
            <div className={css["slit"]} />
            <div className={css["slit"]} />
          </div>
        </div>
      </button>
    </div>
  );
};

export default ClothButton;
