"use client";

import ShirtSVG from "@/assets/shirt/shirt.svg";
import { RootContext } from "@/context/RootContext";
import GarmentEncoder from "@/types/GarmentEncoder";
import Shirt from "@/types/garments/Shirt";
import { useBodyID } from "@/util/hooks";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function Editor() {
  const { encodedId } = useRouter().query;

  const { setHeaderState, activeTask, setActiveTask } = useContext(RootContext);

  const [neck, setNeck] = useState(null);
  const [sleeve, setSleeve] = useState(null);

  /** @type {typeof ShirtSVG} */
  const NeckSVG = neck?.default;
  /** @type {typeof ShirtSVG} */
  const SleeveSVG = sleeve?.default;

  useBodyID("edit");

  useEffect(() => {
    setHeaderState({ title: "Designer-App" });
  }, []);

  useEffect(() => {
    if (typeof encodedId !== "string") return;

    if (!activeTask?.garment) {
      // TODO: re-fetch garment on refresh

      // testing with example garment
      /** @ts-ignore @type {Garment} */
      const garment = new Shirt().serialize();
      garment.id = GarmentEncoder.decode(encodedId);

      setActiveTask({ action: "edit", garment });
    }
  }, [encodedId]);

  useEffect(() => {
    console.log(sleeve);
  }, [sleeve]);

  useEffect(() => {
    const garment = activeTask?.garment;
    if (!garment) return;

    getSVG("short-sleeve").then(setSleeve);
    getSVG("v-neck").then(setNeck);
  }, [activeTask?.garment]);

  /** @param {string} asset */
  function getSVG(asset) {
    return import(`@/assets/shirt/${asset}.svg`);
  }

  return (
    <div className="edit-layout">
      <div className="garment-puppet">
        {/* // TODO: move shirt puppet to its own component */}
        <div className={clsx("shirt-puppet", !neck && "opacity-0")}>
          {sleeve && (
            <SleeveSVG className={clsx("sleeve", "left", SleeveSVG?.name)} />
          )}
          {sleeve && (
            <SleeveSVG className={clsx("sleeve", "right", SleeveSVG?.name)} />
          )}
          <ShirtSVG className="shirt" />
          {neck && <NeckSVG className="neck" />}
        </div>
      </div>
    </div>
  );
}
