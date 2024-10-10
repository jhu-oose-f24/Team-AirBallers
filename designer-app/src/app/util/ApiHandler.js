/**
 * @typedef {import("next").PageConfig | undefined} ApiConfig
 *
 * @typedef {(typeof METHODS)[number]} ApiMethod
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

const METHODS = /** @type {const} */ ([
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "HEAD",
  "OPTIONS",
]);

// TODO: define middleware ?
// app.use(cors({ credentials: true }));
// app.use(helmet());

export default function ApiHandler() {
  /** @ts-ignore @type {ApiDefinedHandlers} */
  const handlers = {
    set(builder, method, handler) {
      this[method] = handler;
      return builder;
    },
  };

  /** @ts-ignore @type {ApiHandlerBuilder} */
  const routeBuilder = {
    build() {
      return async (req, res) => {
        /** @type {ApiHandler} */
        const handler = handlers[req.method];

        if (!handler) {
          res.status(405).json({ error: `Method ${req.method} not allowed` });
          return;
        }
        await handler?.(req, res);
      };
    },

    buildWithConfig(config = undefined) {
      return {
        config,
        handler: this.build(),
      };
    },
  };

  METHODS.forEach((method) => {
    routeBuilder[method] = (handler) => {
      return handlers.set(routeBuilder, method, handler);
    };
  });

  return routeBuilder;
}
