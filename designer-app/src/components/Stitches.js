"use client";

import clsx from "clsx";
import css from "../styles/Stitches.module.css";

/** @param {StitchProps} props */
const Stitches = (props) => {
  const {
    type,
    svgClass,
    pathClass,
    stitchWidth,
    stitchLength = "normal",
    stitchSpacing = "normal",
    centered,
  } = props;

  /** @type {{ [k in props["stitchLength"]]: number }} */
  const dashLength = { long: 5, normal: 2.5, short: 1.8 };
  const stitchesClass = clsx(css.stitches, centered && css.centered, pathClass);

  const multDash = (mult = 0) => `calc(var(--stitch-width) * ${mult})`;

  return (
    <svg
      className={clsx(css["stitch-wrapper"], svgClass)}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        // @ts-ignore
        "--stitch-width": stitchWidth,
        "--stitch-length": multDash(dashLength[stitchLength]),
        "--stitch-spacing": multDash(dashLength[stitchSpacing]),
      }}
    >
      {type === "border" ? (
        <rect className={stitchesClass} width="100%" height="100%" />
      ) : (
        <line className={stitchesClass} x1="0" x2="100%" />
      )}
    </svg>
  );
};

export default Stitches;
