"use client";

import GarmentSpecEditor from "@/components/GarmentSpecEditor";
import { RootContext } from "@/context/RootContext";
import GarmentPuppet from "@/components/GarmentPuppet";
import GarmentEncoder from "@/types/GarmentEncoder";
import GarmentTypes from "@/types/GarmentTypes";
import Shirt from "@/types/garments/Shirt";
import { useBodyID } from "@/util/hooks";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function Editor() {
  const { encodedId } = useRouter().query;

  const { setHeaderState, activeTask, setActiveTask } = useContext(RootContext);

  /** @type {UseState<GarmentInstance>} */
  const [parsedGarment, setParsedGarment] = useState(null);

  useBodyID("edit");

  useEffect(() => {
    setHeaderState({ title: "Designer-App" });
  }, []);

  useEffect(() => {
    if (typeof encodedId !== "string") return;

    if (!activeTask?.garment) {
      // TODO: re-fetch garment (from url) on refresh

      // testing with example garment
      /** @ts-ignore @type {Garment} */
      const garment = new Shirt().serialize();
      garment.id = GarmentEncoder.decode(encodedId);

      setActiveTask({ action: "edit", garment });
      setParsedGarment(GarmentTypes[garment?.type]?.from(garment));
    }

    return () => setActiveTask(null);
  }, [encodedId]);

  return (
    <div className="edit-layout">
      <GarmentPuppet garment={parsedGarment} />

      <GarmentSpecEditor specs={parsedGarment?.specs} />
    </div>
  );
}
