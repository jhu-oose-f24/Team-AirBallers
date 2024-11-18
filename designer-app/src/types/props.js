// This file is used to define component prop types

/**
 * @typedef {"long" | "normal" | "short"} StitchDash
 *
 * @typedef {{
 *   type: "border" | "line";
 *   svgClass?: ClassName;
 *   pathClass?: ClassName;
 *   stitchWidth?: string;
 *   stitchLength?: StitchDash;
 *   stitchSpacing?: StitchDash;
 *   centered?: boolean;
 * }} StitchProps
 */

/**
 * @typedef {{
 *   className?: ClassName;
 *   variant?: "primary" | "secondary" | "hint";
 *   borderRadius?: React.CSSProperties["borderRadius"];
 *   bgColor?: CSSColor;
 *   onClick?: React.MouseEventHandler;
 *   loading?: boolean;
 *   disabled?: boolean;
 *   label?: string;
 *   icon?: JSX.Element;
 *   image?: string;
 *   tint?: CSSColor;
 *   height?: React.CSSProperties["height"];
 *   width?: React.CSSProperties["width"];
 *   stretch?: boolean;
 *   align?: React.CSSProperties["justifyContent"];
 *   size?: "xs" | "sm" | "lg";
 *   fontSize?: React.CSSProperties["fontSize"];
 *   xPad?: React.CSSProperties["paddingInline"];
 *   yPad?: React.CSSProperties["paddingBlock"];
 *   style?: React.CSSProperties;
 * }} ButtonProps
 */

/**
 * @typedef {Omit<React.ButtonHTMLAttributes<any>, "type"> & {
 *   height?: React.CSSProperties["height"];
 *   type: "round" | "cross";
 *   borderWidth?: React.CSSProperties["outlineWidth"];
 *   tint?: CSSColor;
 *   icon?: any;
 * }} ClothButtonProps
 */

/**
 * @typedef {{
 *   state: UseState<boolean>;
 *   disabled?: boolean;
 * }} ToggleProps
 */

/**
 * @typedef {{
 *   id?: string;
 *   className?: ClassName;
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
 *   wrapText?: boolean;
 *   error?: string;
 *   style?: React.CSSProperties;
 * }} InputFieldProps
 */

/**
 * @typedef {{
 *   title: string;
 *   openState: UseState<boolean>;
 *   children?: React.ReactNode;
 *   onAfterOpen?: ReactModal.OnAfterOpenCallback;
 *   onAfterClose?: () => void;
 * }} ModalProps
 */

/** @typedef {import("@tippyjs/react").TippyProps} TooltipProps */

/** @typedef {{ garments: Garment[] }} CollectionPreviewProps */

/**
 * @typedef {{
 *   label: string;
 *   icon?: React.JSX.Element;
 *   action: React.MouseEventHandler;
 * }} ContextMenuOption
 *
 *
 * @typedef {TooltipProps & {
 *   options: ContextMenuOption[];
 * }} ContextMenuProps
 */

/**
 * @typedef {import("overlayscrollbars").EventListeners} ScrollContainerEventListeners
 *
 *
 * @typedef {Omit<
 *   import("overlayscrollbars-react").OverlayScrollbarsComponentProps,
 *   "events" | "onScroll"
 * > & {
 *   onScroll?: ScrollContainerEventListeners["scroll"];
 *   onDestroyed?: ScrollContainerEventListeners["destroyed"];
 *   onInitialized?: ScrollContainerEventListeners["initialized"];
 *   onUpdated?: ScrollContainerEventListeners["updated"];
 * }} ScrollContainerProps
 */
