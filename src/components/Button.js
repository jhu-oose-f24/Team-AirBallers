"use client";

import Stitches from "@/components/Stitches";
import { pause } from "@/util/misc";
import { paletteFrom } from "@/util/tint";
import clsx from "clsx";
import css from "../styles/Button.module.css";

/** @param {ButtonProps} props */
const Button = (props) => {
  const {
    className,

    onClick,
    loading,
    disabled,

    label,
    icon,
    image,
    tint,
    height,
    width,
    stretch,

    size, // shorthand sets props below (and more)
    fontSize,
    xPad,
    yPad,
  } = props;

  /**
   * @typedef {Partial<StitchProps & CustomCSSProperties>} SizePreset
   * @type {{ [x in ButtonProps["size"]]: SizePreset }}
   */
  const SIZE_PRESETS = {
    xs: {
      "--btn-x-padding": "0.5rem",
      "--btn-y-padding": "0.3rem",
      "--btn-font-size": "0.9rem",
      "--btn-border-pad": "0.35rem",
      stitchLength: "short",
      stitchSpacing: "short",
      fontWeight: 600,
    },
    sm: {
      "--btn-x-padding": "0.7rem",
      "--btn-y-padding": "0.45rem",
      "--btn-font-size": "1.1rem",
      "--btn-border-pad": "0.4rem",
      stitchLength: "short",
    },
    lg: {
      "--btn-x-padding": "1.1rem",
      "--btn-y-padding": "0.7rem",
      "--btn-font-size": "1.5rem",
      "--btn-border-pad": "0.55rem",
      stitchWidth: "0.18rem",
    },
  };

  /** @type {CustomCSSProperties} */
  const tintPalette = paletteFrom(tint);

  /** @type {CustomCSSProperties} */
  const moddedStyle = {
    "--btn-x-padding": xPad || (width && "0.4rem"),
    "--btn-y-padding": yPad || ((stretch || height) && "0px"),
    "--btn-font-size": fontSize,
    ...(SIZE_PRESETS[size] || {}),
  };

  /** @param {React.KeyboardEvent} event */
  async function enterClick(event) {
    const btn = event.currentTarget?.querySelector("button");
    if (event.key === "Enter") {
      btn?.classList.add(css["active"]);
      await pause(200);
      btn?.classList.remove(css["active"]);
    }
  }

  return (
    <div
      className={clsx(css["btn-wrapper"], className)}
      style={{ height, width, alignSelf: stretch && "stretch" }}
      onKeyDown={enterClick}
    >
      <button
        className={clsx(css.btn, css.patch, loading && css.loading)}
        style={{ ...(disabled ? {} : tintPalette), ...moddedStyle }}
        onClick={loading || disabled ? null : onClick}
        disabled={disabled}
      >
        <div className={css.border}>
          <div className={css.content}>
            {icon && <span className={css.icon}>{icon}</span>}
            {image && <img src={image} alt="" className={css.image} />}
            {label && <span className={css.label}>{label}</span>}
          </div>
          <Stitches
            type="border"
            svgClass={css["stitch-wrapper"]}
            pathClass={css.stitches}
            stitchLength={SIZE_PRESETS[size]?.stitchLength}
            stitchSpacing={SIZE_PRESETS[size]?.stitchSpacing}
            stitchWidth={SIZE_PRESETS[size]?.stitchWidth}
          />
        </div>
      </button>
    </div>
  );
};

export default Button;
