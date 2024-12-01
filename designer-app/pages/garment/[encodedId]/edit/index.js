import { RootContext } from "@/context/RootContext";
import GarmentEncoder from "@/types/GarmentEncoder";
import Shirt from "@/types/garments/Shirt";
import { useBodyID } from "@/util/hooks";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export default function Editor() {
  const { encodedId } = useRouter().query;

  const { setHeaderState, activeTask, setActiveTask } = useContext(RootContext);

  useBodyID("edit");

  useEffect(() => setHeaderState({ title: "Designer-App" }), []);

  useEffect(() => {
    if (typeof encodedId !== "string") return;

    if (!activeTask?.garment) {
      // TODO: re-fetch garment on refresh

      /** @ts-ignore @type {Garment} */
      const garment = new Shirt().serialize();
      garment.id = GarmentEncoder.decode(encodedId);

      setActiveTask({ action: "edit", garment });
    }
  }, [encodedId]);

  return <div className="edit-layout"></div>;
}
