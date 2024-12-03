import ClothButton from "@/components/ClothButton";
import css from "@/styles/Toggle.module.css";
import { IconLock } from "@tabler/icons-react";
import clsx from "clsx";

/** @param {ToggleProps} props */
const Toggle = (props) => {
  const { state, disabled } = props;

  const [active, setActive] = state;

  return (
    <div
      className={clsx(
        css.toggle,
        active && css.active,
        disabled && css.disabled,
      )}
      onClick={() => !disabled && setActive(!active)}
    >
      <div className={css.track}>
        <span className={css.label}>{active ? "ON" : "OFF"}</span>
      </div>

      <ClothButton
        type="round"
        className={css["handle-btn"]}
        height="var(--toggle-handle-height)"
        borderWidth={active && "0.24rem"}
        icon={disabled && <IconLock className={css["lock-icon"]} />}
      />
    </div>
  );
};

export default Toggle;
