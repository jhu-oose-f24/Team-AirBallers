/**
 * @template T
 * @typedef {React.Dispatch<React.SetStateAction<T>>} SetState
 */

/**
 * @template T
 * @typedef {[T, SetState<T>]} UseState
 */

/**
 * =============== Forward Ref Shorthand ===============
 *
 * @template P, R
 * @typedef {React.ForwardRefExoticComponent<
 *   React.PropsWithoutRef<P> & React.RefAttributes<R>
 * >} ForwardRef
 */

/**
 * @template {React.ElementType<?>} C
 * @typedef {React.ComponentRef<C>} RefType
 */

/**
 * @typedef {React.HTMLAttributes<HTMLElement>["className"]} ClassName
 *
 * @typedef {import("csstype").Property.Color} CSSColor
 */

/**
 * @typedef {React.CSSProperties & {
 *   [x: string]: any;
 * }} CustomCSSProperties
 */

/** @typedef {ForwardRef<React.InputHTMLAttributes, HTMLInputElement>} HTMLInputFC */
/** @typedef {ForwardRef<React.TextareaHTMLAttributes, HTMLTextAreaElement>} HTMLTextAreaFC */
/** @typedef {HTMLInputFC | HTMLTextAreaFC} GeneralInput */

/** @typedef {import("overlayscrollbars-react").OverlayScrollbarsComponentRef} ScrollContainerRef */

/**
 * @callback TooltipOffset
 * @param {{
 *   placement: import("tippy.js").Placement;
 *   popper: import("@popperjs/core").Rect;
 *   reference: import("@popperjs/core").Rect;
 * }} props
 * @returns {[number, number]}
 */

/**
 * @typedef {{
 *   minLength?: number;
 *   maxLength?: number;
 * }} StringSpecOptions
 */

/**
 * @typedef {(typeof import("@/types/AbstractSpecType"))["default"]} AbstractSpecType
 *
 *
 * @typedef {ReturnType<AbstractSpecType["defineSchema"]>} BlankAbstractSpec
 *
 * @typedef {{
 *   name: string;
 *   spec: InstanceType<AbstractSpecType> | BlankAbstractSpec | string;
 * }} NamedSpec
 *
 *
 * @typedef {{
 *   name: string;
 *   spec: BlankAbstractSpec;
 * }} BlankNamedSpec
 *
 * @typedef {{
 *   name: string;
 *   spec: InstanceType<AbstractSpecType>;
 * }} DefinedNamedSpec
 *
 *
 * @typedef {NamedSpec[]} SpecSchema
 *
 * @typedef {DefinedNamedSpec[]} DefinedSpecSchema
 *
 * @typedef {BlankNamedSpec[]} BlankSpecSchema
 */

/**
 * @typedef {import("@prisma/client").User} User
 *
 * @typedef {import("@prisma/client").Collection} Collection
 *
 * @typedef {import("@prisma/client").Garment} Garment
 *
 * @typedef {import("@prisma/client").GarmentImage} GarmentImage
 *
 * @typedef {import("@prisma/client").GarmentPrompt} GarmentPrompt
 *
 * @typedef {import("@prisma/client").GarmentType} GarmentType
 */

/** @typedef {React.MutableRefObject<import("tippy.js").Instance>} TooltipRef */

/**
 * @typedef {{ action?: "move" | "rename" | "delete" }} ActiveTask
 *
 * @typedef {ActiveTask & { garment?: Garment }} ActiveGarmentTask
 *
 * @typedef {ActiveTask & { collection?: Collection }} ActiveCollectionTask
 */
