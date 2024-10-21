"use client";

import chroma from "chroma-js";
import clsx from "clsx";
import { useEffect, useState } from "react";
import styles from "../styles/PatchButton.module.css";

/** @param {PatchButtonProps} props */
const PatchButton = (props) => {
  const { color, label, icon } = props;

  /** @type {UseState<CustomCSSProperties>} */
  const [palette, setPalette] = useState({});

  useEffect(genPalette, [color]);

  function genPalette() {
    if (!chroma.valid(color)) return setPalette({});

    const hue = chroma(color).hsl()[0];
    setPalette({
      "--hue": color,

      "--color-darkest": chroma.hsl(hue, 1.0, 0.15).css(),
      "--color-darker": chroma.hsl(hue, 1.0, 0.25).css(),
      "--color-dark": chroma.hsl(hue, 0.6, 0.5).css(),
      "--color-light": chroma.hsl(hue, 1.0, 0.75).css(),
      "--color-lighter": chroma.hsl(hue, 1.0, 0.8).css(),
      "--color-lightest": chroma.hsl(hue, 1.0, 0.95).css(),
      "--color-active-fill": chroma.hsl(hue, 1.0, 0.9).css(),
    });
  }

  const stitches = (
    <svg
      className={styles["stitch-overlay"]}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect className={styles.stitches} width="100%" height="100%" />
    </svg>
  );

  return (
    <button className={clsx(styles.btn, styles.patch)} style={{ ...palette }}>
      <div className={styles.border}>
        {stitches}
        <div className={styles.content}>
          {icon && <span className={styles.icon}>{icon}</span>}
          {label && <span className={styles.label}>{label}</span>}
        </div>
      </div>
    </button>
  );
};

export default PatchButton;
