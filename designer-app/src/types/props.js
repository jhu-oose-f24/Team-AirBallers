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
 *   className?: ClassName;
 *   openState: UseState<boolean>;
 *   children?: React.ReactNode;
 *   onAfterOpen?: ReactModal.OnAfterOpenCallback;
 *   onAfterClose?: () => void;
 * }} ModalProps
 */

/** @typedef {import("@tippyjs/react").TippyProps} TooltipProps */

/**
 * @typedef {{
 *   label: string;
 *   icon?: React.JSX.Element;
 *   action: React.MouseEventHandler;
 *   destructive?: boolean;
 * }} ContextMenuOption
 *
 *
 * @typedef {TooltipProps & {
 *   title: string;
 *   options: ContextMenuOption[];
 * }} ContextMenuProps
 */

/**
 * @typedef {{
 *   itemName: string;
 *   contextTitle: string;
 *   contextOptions: ContextMenuOption[];
 *   openMenuRef: React.MutableRefObject;
 *   onMenuOpen?: TooltipProps["onShow"];
 *   onMenuClose?: TooltipProps["onHidden"];
 *   appendTo: HTMLElement;
 *   menuPlacement?: TooltipProps["placement"];
 *   nameoverflowPlacement?: TooltipProps["placement"];
 * }} GridItemInfoProps
 */

/** @typedef {{ garments: Garment[] }} CollectionPreviewProps */

/** @typedef {{ garment: Garment }} GarmentCardProps */

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
 *   manageMenuSingleton?: boolean;
 * }} ScrollContainerProps
 */

/**
 * @typedef {{
 *   title: string;
 *   activeTask: UseState<ActiveGarmentTask | ActiveCollectionTask>[0];
 *   setActiveTask: UseState<ActiveGarmentTask | ActiveCollectionTask>[1];
 *   children?: React.ReactNode;
 * }} ItemActionModalProps
 */

/**
 * @typedef {{
 *   inputLabel: string;
 *   originalName: string;
 *   onSaveClick: React.MouseEventHandler;
 * }} ItemRenameModalProps
 */
