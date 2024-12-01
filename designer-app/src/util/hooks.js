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
  function fadeOut() {
    document.body.classList.add("will-unload");
  }

  useEffect(() => {
    document.body.id = id;
    window.addEventListener("beforeunload", fadeOut);

    return () => window.removeEventListener("beforeunload", fadeOut);
  }, []);
};
