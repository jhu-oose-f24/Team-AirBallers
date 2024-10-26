// This file is used to define component prop types
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
 *   stretch?: boolean;
 *   size?: "xs" | "sm" | "lg";
 *   fontSize?: React.CSSProperties["fontSize"];
 *   xPad?: React.CSSProperties["paddingInline"];
 *   yPad?: React.CSSProperties["paddingBlock"];
 * }} PatchButtonProps
 */

/**
 * @typedef {{
 *   id?: string;
 *   className?: string;
 *   placeholder?: string;
 *   value?: string;
 *   defaultValue?: string;
 *   label?: string;
 *   iconLeft?: any;
 *   iconRight?: any;
 *   width?: string;
 *   autoComplete?: React.InputHTMLAttributes["autoComplete"];
 *   onChange?: React.InputHTMLAttributes["onChange"];
 *   hideValue?: boolean;
 *   password?: boolean;
 *   disabled?: boolean;
 *   readOnly?: boolean;
 *   textArea?: boolean;
 *   error?: string;
 *   style?: React.CSSProperties;
 * }} InputFieldProps
 */
