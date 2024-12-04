import { RootContext } from "@/context/RootContext";
import GarmentPuppet from "@/features/GarmentPuppet";
import GarmentSpecEditor from "@/features/GarmentSpecEditor";
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

    return () => setActiveTask(null);
  }, []);

  useEffect(() => {
    if (typeof encodedId !== "string") return;

    let garment = activeTask?.garment;
    if (!activeTask?.garment) {
      // testing with example garment
      /** @ts-ignore @type {Garment} */
      const garment = new Shirt().serialize();
      garment.id = GarmentEncoder.decode(encodedId);
      // TODO: re-fetch garment (from url) on refresh

      setActiveTask({ action: "edit", garment });
    }

    setParsedGarment(GarmentTypes[garment?.type]?.from(garment));
  }, [encodedId, activeTask]);

  return (
    <div className="edit-layout">
      <GarmentPuppet garment={parsedGarment} />

      <GarmentSpecEditor specs={parsedGarment?.specs} />
    </div>
  );
}
