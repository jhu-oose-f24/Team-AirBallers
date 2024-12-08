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
 * @template {object} T
 * @typedef {T[keyof T]} ValueOf
 */

/**
 * @typedef {import("@tabler/icons-react").TablerIcon} TablerIcon
 *
 * @typedef {import("next-auth/providers/index").BuiltInProviderType} OAuthProvider
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
 * @typedef {import("@/types/AbstractSpecType")["default"]} AbstractSpecType
 *
 * @typedef {import("@/types/AbstractGarment")["default"]} AbstractGarment
 *
 * @typedef {import("@/types/GarmentTypes")["default"]} GarmentTypes
 *
 * @typedef {import("@/types/SpecTypes")["default"]} SpecTypes
 *
 * @typedef {ValueOf<SpecTypes>} SpecType
 *
 * @typedef {InstanceType<AbstractGarment>} GarmentInstance
 */

/**
 * @template {SpecType} [T=SpecType] Default is `SpecType`
 * @typedef {InstanceType<T>} SpecInstance
 */

/**
 * @typedef {ReturnType<AbstractSpecType["defineSchema"]>} BlankAbstractSpec
 *
 * @typedef {{
 *   name: string;
 *   spec: BlankAbstractSpec;
 * }} BlankNamedSpec
 */

/**
 * @template {SpecType} [T=SpecType] Default is `SpecType`
 * @typedef {{
 *   name: string;
 *   spec: SpecInstance<T> | BlankAbstractSpec | string;
 * }} NamedSpec
 */

/**
 * @template {SpecType} [T=SpecType] Default is `SpecType`
 * @typedef {{
 *   name: string;
 *   spec: SpecInstance<T>;
 * }} DefinedNamedSpec
 */

/**
 *
 *
 * @typedef {NamedSpec<SpecType>[]} SpecSchema
 *
 * @typedef {DefinedNamedSpec<SpecType>[]} DefinedSpecSchema
 *
 * @typedef {BlankNamedSpec[]} BlankSpecSchema
 */

/**
 * @template {ValueOf<GarmentTypes>} G
 * @typedef {{
 *   [S in G["SPEC_NAMES"][number]]: SpecInstance<SpecType>;
 * }} SpecMap
 */

/**
 * @typedef {import("@prisma/client").User} User
 *
 * @typedef {import("@prisma/client").Collection} Collection
 *
 * @typedef {Collection & { garments: Garment[] }} CollectionWithGarments
 *
 * @typedef {Collection & { numGarments: number }} CollectionWithGarmentCount
 *
 * @typedef {import("@prisma/client").Garment} Garment
 *
 * @typedef {import("@prisma/client").GarmentImage} GarmentImage
 *
 * @typedef {import("@prisma/client").GarmentPrompt} GarmentPrompt
 *
 * @typedef {import("@prisma/client").GarmentType} GarmentType
 */

/**
 * @typedef {import("tippy.js").Instance} TooltipInst
 *
 * @typedef {React.MutableRefObject<TooltipInst>} TooltipRef
 */

/**
 * @typedef {{
 *   action?: "move" | "edit" | "rename" | "delete";
 *   garment?: Garment;
 * }} ActiveGarmentTask
 *
 *
 * @typedef {{
 *   action?: "rename" | "delete";
 *   collection?: Collection;
 * }} ActiveCollectionTask
 */

/** @typedef {React.FC<SpecEditorProps<SpecType>>} SpecEditor */

/**
 * @typedef {import("next").PageConfig | undefined} ApiConfig
 *
 * @typedef {(typeof import("@/util/ApiHandler").METHODS)[number]} ApiMethod
 *
 * @typedef {(
 *   req: import("next").NextApiRequest,
 *   res: import("next").NextApiResponse,
 * ) => void | Promise<void>} ApiHandler
 *
 *
 * @typedef {(handler: ApiHandler) => ApiHandlerBuilder} ApiHandlerSetter
 *
 * @typedef {{
 *   [M in ApiMethod]: ApiHandler;
 * } & {
 *   set: (
 *     builder: ApiHandlerBuilder,
 *     method: ApiMethod,
 *     handler: ApiHandler,
 *   ) => ApiHandlerBuilder;
 * }} ApiDefinedHandlers
 *
 *
 * @typedef {{
 *   [M in ApiMethod]: ApiHandlerSetter;
 * } & {
 *   build: () => ApiHandler;
 *   buildWithConfig: (config: ApiConfig) => {
 *     handler: ApiHandler;
 *     config: ApiConfig;
 *   };
 * }} ApiHandlerBuilder
 */
