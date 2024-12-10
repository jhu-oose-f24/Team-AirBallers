import css from "@/styles/puppet/Pants.module.css";
import Pants from "@/types/garments/Pants";
import chroma from "chroma-js";
import clsx from "clsx";
import { useEffect, useState } from "react";

/** @param {PuppetProps<typeof Pants>} props */
const PantsPuppet = (props) => {
  const { specs } = props;

  const [closure, setClosure] = useState(null);
  const [pockets, setPockets] = useState(null);
  const [base, setBase] = useState(null);
  const [leg, setLeg] = useState(null);

  /** @type {React.FC<React.SVGProps<SVGElement>>} */
  const ClosureSVG = closure?.default;
  /** @type {React.FC<React.SVGProps<SVGElement>>} */
  const PocketsSVG = pockets?.default;
  /** @type {React.FC<React.SVGProps<SVGElement>>} */
  const BaseSVG = base?.default;
  /** @type {React.FC<React.SVGProps<SVGElement>>} */
  const LegSVG = leg?.default;

  useEffect(() => {
    if (!specs) return;
    const rise = specs.Rise.value;
    const pocketsFile = rise === "low-rise" ? "pockets-low-rise" : "pockets";

    getSVG(`closure-${specs["Closure Type"].value}`).then(setClosure);
    getSVG(pocketsFile).then(setPockets);
    getSVG(rise).then(setBase);
    getSVG(`style-${specs.Style.value}`).then(setLeg);
  }, [specs]);

  /** @param {string} asset */
  function getSVG(asset) {
    return import(`@/assets/pants/${asset}.svg`).catch(console.log);
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

    return {
      // @ts-ignore

      "--main-color": mainColor,
      "--main-outline": calcAccentColor(mainColor),
    };
  }

  return (
    <div
      className={clsx("puppet", css["pants-puppet"], !base && "opacity-0")}
      style={{ ...getColorStyles() }}
    >
      {closure && <ClosureSVG className={css.closure} />}
      {pockets && <PocketsSVG className={css.pockets} />}
      {base && <BaseSVG className={css.base} />}
      {leg && <LegSVG className={clsx(css.leg, css.left)} />}
      {leg && <LegSVG className={clsx(css.leg, css.right)} />}
    </div>
  );
};

export default PantsPuppet;
