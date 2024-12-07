export const METHODS = /** @type {const} */ ([
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "HEAD",
  "OPTIONS",
]);

/** @param {ApiHandler} middleware */
export default function ApiHandler(middleware = null) {
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
      const handler = async (req, res) => {
        /** @type {ApiHandler} */
        const handler = handlers[req.method];

        if (!handler) {
          res.status(405).json({ error: `Method ${req.method} not allowed` });
          return;
        }
        await middleware?.(req, res);
        await handler?.(req, res);
      };

      return handler;
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
