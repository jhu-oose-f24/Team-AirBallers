"use client";

import clsx from "clsx";
import stitchStyles from "../styles/Stitches.module.css";

/** @param {StitchProps} props */
const Stitches = (props) => {
  const {
    type,
    svgClass,
    pathClass,
    stitchWidth,
    stitchLength = "normal",
    stitchSpacing = "normal",
  } = props;

  /** @type {{ [k in props["stitchLength"]]: number }} */
  const dashLength = { long: 4, normal: 2.5, short: 1.5 };

  const multDash = (mult = 0) => `calc(var(--stitch-width) * ${mult})`;

  return (
    <svg
      className={clsx(stitchStyles["stitch-wrapper"], svgClass)}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        // @ts-ignore
        "--stitch-width": stitchWidth,
        "--stitch-length": multDash(dashLength[stitchLength]),
        "--stitch-spacing": multDash(dashLength[stitchSpacing]),
      }}
    >
      {type === "border" ? (
        <rect
          className={clsx(stitchStyles.stitches, pathClass)}
          width="100%"
          height="100%"
        />
      ) : (
        <line
          className={clsx(stitchStyles.stitches, pathClass)}
          x1="0"
          x2="100%"
        />
      )}
    </svg>
  );
};

export default Stitches;
