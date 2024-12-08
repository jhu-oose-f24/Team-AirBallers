import chroma from "chroma-js";
import colors from "tailwindcss/colors";

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
  const hue = Math.round(chroma(tint).hsl()[0]);

  return {
    // @ts-ignore
    "--hue": tint,
    "--primary": HSL(hue, 1.0, 0.25),

    "--primary-darkest": HSL(hue, 1.0, 0.15),
    "--primary-darker": HSL(hue, 1.0, 0.25),
    "--primary-dark": HSL(hue, 0.6, 0.5),
    "--primary-medium": HSL(hue, 0.75, 0.6),
    "--primary-light": HSL(hue, 1.0, 0.75),
    "--primary-lighter": HSL(hue, 1.0, 0.8),
    "--primary-lightest": HSL(hue, 1.0, 0.95),

    "--primary-active-fill": HSL(hue, 1.0, 0.9),

    "--primary-input-text": HSL(hue, 1.0, 0.1),
    "--primary-input-placeholder": HSL(hue, 0.55, 0.45),
  };
}

/** @param {function(typeof colors): CSSColor} predicate */
export function paletteFromTailwind(predicate) {
  return paletteFrom(predicate?.(colors));
}

/**
 * @param {TooltipInst} inst
 * @param {CSSColor} color
 */
export function setTooltipPalette(inst, color) {
  if (!inst?.popper) return;

  const varDefs = {
    "--hue": undefined,
    "--primary": undefined,
    "--primary-darkest": undefined,
    "--primary-darker": undefined,
    "--primary-dark": undefined,
    "--primary-medium": undefined,
    "--primary-light": undefined,
    "--primary-lighter": undefined,
    "--primary-lightest": undefined,
    "--primary-active-fill": undefined,
    "--primary-input-text": undefined,
    "--primary-input-placeholder": undefined,
  };

  const palette = paletteFrom(color);
  for (let colorVar in varDefs) {
    if (palette[colorVar]) {
      inst.popper.style.setProperty(colorVar, palette[colorVar]);
    } else {
      inst.popper.style.removeProperty(colorVar);
    }
  }
}

/** @type {CSSColor} */
export const dangerColor = colors.rose[400];
export const dangerPalette = paletteFrom(dangerColor);
