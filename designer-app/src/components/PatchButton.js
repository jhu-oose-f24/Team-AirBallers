"use client";

import Stitches from "@/components/Stitches";
import chroma from "chroma-js";
import clsx from "clsx";
import { useEffect, useState } from "react";
import btnStyles from "../styles/PatchButton.module.css";

/** @param {PatchButtonProps} props */
const PatchButton = (props) => {
  const {
    onClick,
    loading,
    disabled,

    label,
    icon,
    tint,
    height,
    width,

    size, // shorthand sets props below (and more)
    fontSize,
    xPad,
    yPad,
  } = props;

  /**
   * @typedef {StitchProps & CustomCSSProperties} SizePreset
   * @type {{ [x in PatchButtonProps["size"]]: SizePreset }}
   */
  const SIZE_PRESETS = {
    // @ts-ignore
    xs: {
      "--btn-x-padding": "0.5rem",
      "--btn-y-padding": "0.3rem",
      "--btn-font-size": "0.9rem",
      "--btn-border-pad": "0.35rem",
      stitchLength: "short",
      stitchSpacing: "short",
      fontWeight: 600,
    },
    // @ts-ignore
    sm: {
      "--btn-x-padding": "0.7rem",
      "--btn-y-padding": "0.45rem",
      "--btn-font-size": "1.1rem",
      "--btn-border-pad": "0.4rem",
      stitchLength: "short",
    },
    // @ts-ignore
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

  useEffect(updateStyle, [fontSize, height, width, xPad, yPad, size]);
  useEffect(genPalette, [tint]);

  function updateStyle() {
    setModdedStyle({
      "--btn-x-padding": xPad || (width && "0.4rem"),
      "--btn-y-padding": yPad || (height && "0px"),
      "--btn-font-size": fontSize,
      ...(SIZE_PRESETS[size] || {}),
    });
  }

  /** @param {number[]} color */
  function HSL(...[h, s, l]) {
    return chroma.hsl(h, s, l).css("hsl");
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

  return (
    <div className={btnStyles["btn-wrapper"]} style={{ height, width }}>
      <button
        className={clsx(
          btnStyles.btn,
          btnStyles.patch,
          loading && btnStyles.loading,
        )}
        style={{ ...(disabled ? {} : tintPalette), ...moddedStyle }}
        onClick={loading || disabled ? null : onClick}
        disabled={disabled}
      >
        <div className={btnStyles.border}>
          <Stitches
            type="border"
            svgClass={btnStyles["stitch-wrapper"]}
            pathClass={btnStyles.stitches}
            stitchLength={SIZE_PRESETS[size]?.stitchLength}
            stitchSpacing={SIZE_PRESETS[size]?.stitchSpacing}
            stitchWidth={SIZE_PRESETS[size]?.stitchWidth}
          />
          <div className={btnStyles.content}>
            {icon && <span className={btnStyles.icon}>{icon}</span>}
            {label && <span className={btnStyles.label}>{label}</span>}
          </div>
        </div>
      </button>
    </div>
  );
};

export default PatchButton;
