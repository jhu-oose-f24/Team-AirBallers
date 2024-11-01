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

export const useBodyID = (id = "") => {
  useEffect(() => {
    document.body.id = id;

    return () => document.body.removeAttribute("id");
  }, []);
};
