"use client";

import { useEffect } from "react";

/**
 * @param {React.EffectCallback} effect
 * @param {React.DependencyList} deps
 */
export const useOnResize = (effect, deps) => {
  useEffect(() => {
    window.addEventListener("resize", effect);
    return () => window.removeEventListener("resize", effect);
  }, deps);
};
