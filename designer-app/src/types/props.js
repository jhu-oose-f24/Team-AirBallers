// This file is used to define component prop types

/**
 * @typedef {{
 *   onClick?: React.MouseEventHandler;
 *   loading?: boolean;
 *   disabled?: boolean;
 *   label?: string;
 *   icon?: JSX.Element;
 *   tint?: React.CSSProperties["color"];
 *   height?: React.CSSProperties["height"];
 *   width?: React.CSSProperties["width"];
 *   size?: "xs" | "sm" | "lg";
 *   fontSize?: React.CSSProperties["fontSize"];
 *   xPad?: React.CSSProperties["paddingInline"];
 *   yPad?: React.CSSProperties["paddingBlock"];
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
