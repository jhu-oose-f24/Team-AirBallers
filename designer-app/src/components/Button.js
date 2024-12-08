import Stitches from "@/components/Stitches";
import css from "@/styles/Button.module.css";
import { pause } from "@/util/misc";
import { paletteFrom } from "@/util/tint";
import clsx from "clsx";
import { forwardRef } from "react";

/**
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

/** @type {ForwardRef<ButtonProps, HTMLButtonElement>} */
const Button = forwardRef((props, ref) => {
  const {
    className,
    variant = "primary",
    borderRadius,
    bgColor = "var(--background-main)",

    onClick,
    loading,
    disabled,
    tabIndex,

    label,
    icon,
    image,
    tint,
    height,
    width,
    stretch,
    align = "center",
    reverse,

    size, // shorthand sets props below (and more)
    fontSize,
    xPad,
    yPad,

    style,
  } = props;

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
          reverse && css.reverse,
        )}
        style={{
          ...(!disabled && paletteFrom(tint)),
          ...(variant === "secondary" && {
            "--primary-darker": "var(--disabled-darkest)",
            "--primary-light": "var(--disabled-lighter)",
            "--primary-lighter": bgColor,
            "--primary-active-fill": bgColor,
          }),
          ...(variant === "hint" && {
            "--primary-light": bgColor || "var(--background-alt)",
            "--primary-lighter": "transparent",
          }),

          ...(width && { "--btn-x-padding": "0.4rem" }),
          ...((stretch || height) && { "--btn-y-padding": "0px" }),
          ...(SIZE_PRESETS[size]?.css || {}),
          ...(variant !== "primary" && {
            "--btn-border-pad": "0px",
            "--btn-content-radius": "0.65rem",
          }),
          ...(xPad && { "--btn-x-padding": xPad }),
          ...(yPad && { "--btn-y-padding": yPad }),
          ...(fontSize && { "--btn-font-size": fontSize }),
          ...(borderRadius && { "--btn-content-radius": borderRadius }),
        }}
        onClick={loading || disabled ? null : onClick}
        disabled={disabled}
        tabIndex={tabIndex}
        ref={ref}
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
});

export default Button;
