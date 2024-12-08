import ShirtSVG from "@/assets/shirt/shirt.svg";
import css from "@/styles/puppet/Shirt.module.css";
import Shirt from "@/types/garments/Shirt";
import chroma from "chroma-js";
import clsx from "clsx";
import { useEffect, useState } from "react";

/** @param {PuppetProps<typeof Shirt>} props */
const ShirtPuppet = (props) => {
  const { specs } = props;

  const [neck, setNeck] = useState(null);
  const [sleeve, setSleeve] = useState(null);

  /** @type {typeof ShirtSVG} */
  const NeckSVG = neck?.default;
  /** @type {typeof ShirtSVG} */
  const SleeveSVG = sleeve?.default;

  useEffect(() => {
    if (!specs) return;

    getSVG(specs["Sleeve Length"].value).then(setSleeve);
    getSVG(specs["Neck Style"].value).then(setNeck);
  }, [specs]);

  /** @param {string} asset */
  function getSVG(asset) {
    return import(`@/assets/shirt/${asset}.svg`).catch(console.log);
  }

  function calcAccentColor(color) {
    if (!chroma.valid(color)) return "#aaa";
    const [h, s, l] = chroma(color).hsl();
    const accentL = l > 0.4 ? l - 0.14 : l + 0.14;

    return chroma.hsl(h, s, accentL).hex("rgb");
  }

  /** @returns {React.CSSProperties} */
  function getColorStyles() {
    const mainColor = specs.Color.value;
    const neckColor = specs["Neck Color"].value;
    const sleeveColor = specs["Sleeve Color"].value;

    return {
      // @ts-ignore

      "--main-color": mainColor,
      "--main-outline": calcAccentColor(mainColor),

      "--neck-color": neckColor,
      "--neck-outline": calcAccentColor(neckColor),

      "--sleeve-color": sleeveColor,
      "--sleeve-outline": calcAccentColor(sleeveColor),
    };
  }

  return (
    <div
      className={clsx(
        "puppet",
        css["shirt-puppet"],
        !(sleeve || neck) && "opacity-0",
      )}
      style={{ ...getColorStyles() }}
    >
      {sleeve && (
        <SleeveSVG
          className={clsx(css.sleeve, css.left, css[SleeveSVG?.name])}
        />
      )}
      {sleeve && (
        <SleeveSVG
          className={clsx(css.sleeve, css.right, css[SleeveSVG?.name])}
        />
      )}
      <ShirtSVG className={css.shirt} />
      {neck && <NeckSVG className={css.neck} />}
    </div>
  );
};

export default ShirtPuppet;
