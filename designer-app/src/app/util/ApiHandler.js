/**
 * @typedef {import("next").PageConfig | undefined} ApiConfig
 *
 * @typedef {(typeof METHODS)[number]} ApiMethod
 *
 * @typedef {(
 *   req: import("next").NextApiRequest,
 *   res: import("next").NextApiResponse,
 * ) => Promise<void>} ApiHandler
 *
 *
 * @typedef {(handler: ApiHandler) => ApiHandlerBuilder} ApiHandlerSetter
 *
 * @typedef {{
 *   [M in ApiMethod]: ApiHandlerSetter;
 * } & {
 *   handlers: { [M in ApiMethod]: ApiHandler };
 *   set: (method: ApiMethod, handler: ApiHandler) => ApiHandlerBuilder;
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

// app.use(cors({ credentials: true }));
// app.use(helmet());

/** @type {function(): ApiHandlerBuilder} */
function ApiHandler() {
  /** @ts-ignore @type {ApiHandlerBuilder} */
  const routeBuilder = {
    /** @ts-ignore @type {{ [M in ApiMethod]: ApiHandler }} */
    handlers: {},

    set(method, handler) {
      this.handlers[method] = handler;
      return this;
    },

    /** @returns {ApiHandler} */
    build() {
      return async (req, res) => {
        const method = this.handlers[req.method];

        if (!method) {
          res.status(405).json({ error: `Method ${req.method} not allowed` });
          return;
        }
        await method?.(req, res);
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
    routeBuilder[method] = (handler) => routeBuilder.set(method, handler);
  });

  return routeBuilder;
}

export { ApiHandler as default };
