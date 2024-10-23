"use client";

import Stitches from "@/components/Stitches";
import chroma from "chroma-js";
import clsx from "clsx";
import { useEffect, useState } from "react";
import btnStyles from "../styles/PatchButton.module.css";

/** @param {PatchButtonProps} props */
const PatchButton = (props) => {
  const { color, label, icon, onClick, loading, disabled } = props;

  /** @type {UseState<CustomCSSProperties>} */
  const [palette, setPalette] = useState({});

  useEffect(genPalette, [color]);

  function genPalette() {
    if (!chroma.valid(color)) return setPalette({});

    const hue = chroma(color).hsl()[0];
    setPalette({
      "--hue": color,

      "--primary-darkest": chroma.hsl(hue, 1.0, 0.15).css(),
      "--primary-darker": chroma.hsl(hue, 1.0, 0.25).css(),
      "--primary-dark": chroma.hsl(hue, 0.6, 0.5).css(),
      "--primary-light": chroma.hsl(hue, 1.0, 0.75).css(),
      "--primary-lighter": chroma.hsl(hue, 1.0, 0.8).css(),
      "--primary-lightest": chroma.hsl(hue, 1.0, 0.95).css(),
      "--primary-active-fill": chroma.hsl(hue, 1.0, 0.9).css(),
    });
  }

  return (
    <button
      className={clsx(
        btnStyles.btn,
        btnStyles.patch,
        loading && btnStyles.loading,
      )}
      style={disabled ? null : { ...palette }}
      onClick={loading || disabled ? null : onClick}
      disabled={disabled}
    >
      <div className={btnStyles.border}>
        <Stitches
          type="border"
          svgClass={btnStyles["stitch-wrapper"]}
          pathClass={btnStyles.stitches}
        />
        <div className={btnStyles.content}>
          {icon && <span className={btnStyles.icon}>{icon}</span>}
          {label && <span className={btnStyles.label}>{label}</span>}
        </div>
      </div>
    </button>
  );
};

export default PatchButton;
