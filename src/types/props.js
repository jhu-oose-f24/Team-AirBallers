// This file is used to define component prop types

/**
 * @typedef {{
 *   color?: React.CSSProperties["color"];
 *   label?: string;
 *   icon?: JSX.Element;
 *   onClick?: React.MouseEventHandler;
 *   loading?: boolean;
 *   disabled?: boolean;
 * }} PatchButtonProps
 */

/**
 * @typedef {"long" | "normal" | "short"} StitchDash
 *
 * @typedef {{
 *   type: "border" | "line";
 *   svgClass?: string;
 *   pathClass?: string;
 *   stitchWidth?: string;
 *   stitchLength?: StitchDash;
 *   stitchSpacing?: StitchDash;
 * }} StitchProps
 */
