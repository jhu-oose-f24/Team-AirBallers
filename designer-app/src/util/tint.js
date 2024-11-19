import chroma from "chroma-js";
/**
 * @param {number} h - Hue
 * @param {number} s - Saturation
 * @param {number} l - Lightness
 */
function HSL(h, s, l) {
  const [H, S, L] = chroma.hsl(h, s, l).hsl();
  return `${H}deg ${Math.round(S * 100)}% ${Math.round(L * 100)}%`;
}

/**
 * @param {CSSColor} tint
 * @returns {React.CSSProperties}
 */
export function paletteFrom(tint) {
  if (!chroma.valid(tint)) {
    return {};
  }
  const hue = chroma(tint).hsl()[0];

  return {
    // @ts-ignore
    "--hue": tint,
    "--primary": HSL(hue, 1.0, 0.25),

    "--primary-darkest": HSL(hue, 1.0, 0.15),
    "--primary-darker": HSL(hue, 1.0, 0.25),
    "--primary-dark": HSL(hue, 0.6, 0.5),
    "--primary-light": HSL(hue, 1.0, 0.75),
    "--primary-lighter": HSL(hue, 1.0, 0.8),
    "--primary-lightest": HSL(hue, 1.0, 0.95),

    "--primary-active-fill": HSL(hue, 1.0, 0.9),

    "--primary-input-text": HSL(hue, 1.0, 0.1),
    "--primary-input-placeholder": HSL(hue, 0.55, 0.45),
  };
}
