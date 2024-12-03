import ShirtSVG from "@/assets/shirt/shirt.svg";
import css from "@/styles/Shirt.module.css";
import Shirt from "@/types/garments/Shirt";
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

  return (
    <div
      className={clsx(
        "puppet",
        css["shirt-puppet"],
        !(sleeve || neck) && "opacity-0",
      )}
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
