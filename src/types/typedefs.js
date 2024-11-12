/**
 * @template T
 * @typedef {[T, React.Dispatch<React.SetStateAction<T>>]} UseState
 */

/**
 * =============== Forward Ref Shorthand ===============
 *
 * @template P, R
 * @typedef {React.FC<
 *   P & {
 *     ref: React.ForwardedRef<R>;
 *   }
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
 * @typedef {{name: string, spec: object}} NamedSpec
 * @typedef {NamedSpec[]} SpecSchema
 */
