import clsx from "clsx";
import css from "../styles/ClothButton.module.css";

/** @param {ClothButtonProps} props */
const ClothButton = (props) => {
  const {
    className,
    type,

    height,
    borderWidth,

    icon,
    tint,

    onClick,
    ...otherProps
  } = props;

  return (
    <div className={clsx(css["btn-wrapper"], className)} {...otherProps}>
      <button
        className={clsx(css["btn"], css["clothing"], css[type])}
        tabIndex={-1}
        style={{
          // @ts-ignore
          "--btn-outer-outline": borderWidth,
        }}
      >
        <div className={css["outer"]} style={{ height }} onClick={onClick}>
          <div className={css["gradient"]} />

          <div className={clsx(css["inner"], icon && css["slits-hidden"])}>
            <div className={css["gradient"]} />

            <div className={css["slit"]} />
            <div className={css["slit"]} />
            <div className={css["slit"]} />
            <div className={css["slit"]} />
          </div>

          {icon}
        </div>
      </button>
    </div>
  );
};

export default ClothButton;
