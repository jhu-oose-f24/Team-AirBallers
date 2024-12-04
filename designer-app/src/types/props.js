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
 *   tabIndex?: React.HTMLAttributes["tabIndex"];
 *   label?: string;
 *   icon?: JSX.Element;
 *   image?: string;
 *   tint?: CSSColor;
 *   height?: React.CSSProperties["height"];
 *   width?: React.CSSProperties["width"];
 *   stretch?: boolean;
 *   align?: React.CSSProperties["justifyContent"];
 *   reverse?: boolean;
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
 *   width?: string;
 *   onChange?: React.InputHTMLAttributes["onChange"];
 *   disabled?: boolean;
 *   tabIndex?: React.HTMLAttributes["tabIndex"];
 *   error?: string;
 *   style?: React.CSSProperties;
 * }} GeneralInputProps
 */

/**
 * @typedef {GeneralInputProps & {
 *   iconRight?: any;
 *   autoComplete?: React.InputHTMLAttributes["autoComplete"];
 *   hideValue?: boolean;
 *   password?: boolean;
 *   readOnly?: boolean;
 *   textArea?: boolean;
 *   wrapText?: boolean;
 * }} InputFieldProps
 */

/**
 * @typedef {GeneralInputProps & {
 *   options: SelectOption[];
 * }} SelectFieldProps
 *
 *
 * @typedef {{
 *   value: string;
 *   label: string;
 *   selected?: boolean;
 *   render?: React.JSX.Element;
 * }} SelectOption
 *
 *
 * @typedef {{
 *   [K: SelectOption["value"]]: {
 *     label: string;
 *     selected?: boolean;
 *     render?: React.JSX.Element;
 *   };
 * }} SelectOptionMap
 */

/**
 * @typedef {"top-left"
 *   | "top-right"
 *   | "bottom-left"
 *   | "bottom-right"
 *   | "center"} ModalPlacement
 *
 *
 * @typedef {{
 *   title: string;
 *   className?: ClassName;
 *   overlayClassName?: ClassName;
 *   openState: UseState<boolean>;
 *   children?: React.ReactNode;
 *   onAfterOpen?: ReactModal.OnAfterOpenCallback;
 *   onAfterClose?: () => void;
 *   placement?: ModalPlacement;
 *   offset?: React.CSSProperties["paddingTop"];
 *   passive?: boolean;
 * }} ModalProps
 */

/**
 * @typedef {import("@tippyjs/react").TippyProps & {
 *   hideAfterMS?: number;
 * }} TooltipProps
 */

/**
 * @typedef {Omit<
 *   TooltipProps,
 *   "content" | "maxWidth" | "disabled" | "delay"
 * > & {
 *   text?: string;
 *   as?: keyof React.JSX.IntrinsicElements;
 * }} OverflowableTextProps
 */

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
 *   openState: UseState<boolean>;
 * }} ProfileModalProps
 */

/**
 * @typedef {{
 *   activeTask: ActiveGarmentTask | ActiveCollectionTask;
 *   setActiveTask: SetState<ActiveGarmentTask | ActiveCollectionTask>;
 * }} ItemActionModalProps
 */

/**
 * @typedef {ItemActionModalProps & {
 *   title: string;
 * }} DynamicItemActionModalProps
 */

/**
 * @typedef {DynamicItemActionModalProps & {
 *   children?: React.ReactNode;
 * }} ItemDeleteModalProps
 */

/**
 * @typedef {DynamicItemActionModalProps & {
 *   inputLabel: string;
 *   originalName: string;
 *   onSaveClick: React.MouseEventHandler;
 * }} ItemRenameModalProps
 */

/**
 * @template {ValueOf<GarmentTypes>} T
 * @typedef {{
 *   specs: SpecMap<T>;
 * }} PuppetProps
 */

/**
 * @template {SpecType} T
 * @typedef {DefinedNamedSpec<T>} SpecEditorProps
 */
