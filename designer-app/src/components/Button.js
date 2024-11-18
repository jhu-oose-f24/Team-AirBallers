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
    variant = "primary",
    borderRadius,
    bgColor = "var(--background-main)",

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
    align = "center",

    size, // shorthand sets props below (and more)
    fontSize,
    xPad,
    yPad,

    style,
  } = props;

  /**
   * @typedef {Partial<StitchProps & CustomCSSProperties>} SizePreset
   * @type {{
   *   [x in ButtonProps["size"]]: {
   *     css: CustomCSSProperties;
   *     stitch: Partial<StitchProps>;
   *   };
   * }}
   */
  const SIZE_PRESETS = {
    xs: {
      css: {
        "--btn-x-padding": "0.5rem",
        "--btn-y-padding": "0.3rem",
        "--btn-font-size": "0.9rem",
        "--btn-border-pad": "0.35rem",
        fontWeight: 600,
      },
      stitch: { stitchLength: "short", stitchSpacing: "short" },
    },
    sm: {
      css: {
        "--btn-x-padding": "0.7rem",
        "--btn-y-padding": "0.45rem",
        "--btn-font-size": "1.1rem",
        "--btn-border-pad": "0.4rem",
      },
      stitch: { stitchLength: "short" },
    },
    lg: {
      css: {
        "--btn-x-padding": "1.1rem",
        "--btn-y-padding": "0.7rem",
        "--btn-font-size": "1.5rem",
        "--btn-border-pad": "0.55rem",
      },
      stitch: { stitchWidth: "0.18rem" },
    },
  };

  /** @type {CustomCSSProperties} */
  const tintPalette = {
    ...paletteFrom(tint),
    ...(variant === "secondary" && {
      "--primary-darker": "var(--disabled-primary-darkest)",
      "--primary-light": "var(--disabled-primary-lighter)",
      "--primary-lighter": bgColor,
      "--primary-active-fill": bgColor,
    }),
    ...(variant === "hint" && {
      "--primary-light": "var(--background-alt)",
      "--primary-lighter": "transparent",
    }),
  };

  /** @type {CustomCSSProperties} */
  const moddedStyle = {
    ...(width && { "--btn-x-padding": "0.4rem" }),
    ...((stretch || height) && { "--btn-y-padding": "0px" }),
    ...(SIZE_PRESETS[size]?.css || {}),
    ...(variant !== "primary" && {
      "--btn-border-pad": "0px",
      "--btn-content-radius": "0.5rem",
    }),
    ...(xPad && { "--btn-x-padding": xPad }),
    ...(yPad && { "--btn-y-padding": yPad }),

    ...(fontSize && { "--btn-font-size": fontSize }),
    ...(borderRadius && { "--btn-content-radius": borderRadius }),
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
      style={{ height, width, alignSelf: stretch && "stretch", ...style }}
      onKeyDown={enterClick}
    >
      <button
        className={clsx(
          css.btn,
          css.patch,
          css[variant],
          loading && css.loading,
        )}
        style={{ ...(disabled ? {} : tintPalette), ...moddedStyle }}
        onClick={loading || disabled ? null : onClick}
        disabled={disabled}
      >
        <div className={css.border}>
          <div className={css.loader}>
            <span />
            <span />
            <span />
          </div>

          <div
            className={css.content}
            style={{
              justifyContent: align,
            }}
          >
            {icon && <span className={css.icon}>{icon}</span>}
            {image && <img src={image} alt="" className={css.image} />}
            {label && <span className={css.label}>{label}</span>}
          </div>
          {variant === "primary" && (
            <Stitches
              type="border"
              svgClass={css["stitch-wrapper"]}
              pathClass={css.stitches}
              stitchLength={SIZE_PRESETS[size]?.stitch?.stitchLength}
              stitchSpacing={SIZE_PRESETS[size]?.stitch?.stitchSpacing}
              stitchWidth={SIZE_PRESETS[size]?.stitch?.stitchWidth}
            />
          )}
        </div>
      </button>
    </div>
  );
};

export default Button;
