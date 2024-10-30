"use client";

import Stitches from "@/components/Stitches";
import { pause } from "@/utils";
import chroma from "chroma-js";
import clsx from "clsx";
import { useEffect, useState } from "react";
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

  /** @type {UseState<CustomCSSProperties>} */
  const [tintPalette, setTintPalette] = useState({});
  /** @type {UseState<CustomCSSProperties>} */
  const [moddedStyle, setModdedStyle] = useState({});

  const sizeDeps = [fontSize, height, width, stretch, xPad, yPad, size];
  useEffect(updateStyle, sizeDeps);
  useEffect(genPalette, [tint]);

  function updateStyle() {
    setModdedStyle({
      "--btn-x-padding": xPad || (width && "0.4rem"),
      "--btn-y-padding": yPad || ((stretch || height) && "0px"),
      "--btn-font-size": fontSize,
      ...(SIZE_PRESETS[size] || {}),
    });
  }

  /**
   * @param {number} h - Hue
   * @param {number} s - Saturation
   * @param {number} l - Lightness
   */
  function HSL(h, s, l) {
    const [H, S, L] = chroma.hsl(h, s, l).hsl();
    return `${H}deg ${Math.round(S * 100)}% ${Math.round(L * 100)}%`;
  }

  function genPalette() {
    if (!chroma.valid(tint)) {
      setTintPalette({});
      return;
    }

    const hue = chroma(tint).hsl()[0];
    setTintPalette({
      "--hue": tint,

      "--primary-darkest": HSL(hue, 1.0, 0.15),
      "--primary-darker": HSL(hue, 1.0, 0.25),
      "--primary-dark": HSL(hue, 0.6, 0.5),
      "--primary-light": HSL(hue, 1.0, 0.75),
      "--primary-lighter": HSL(hue, 1.0, 0.8),
      "--primary-lightest": HSL(hue, 1.0, 0.95),
      "--primary-active-fill": HSL(hue, 1.0, 0.9),
    });
  }

  /** @param {React.KeyboardEvent} event */
  async function enterClick(event) {
    const btn = event.currentTarget?.querySelector("button");
    if (event.key === "Enter") {
      btn?.classList.add(css["active"]);
      btn?.click();
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
