import EditorContextProvider from "@/context/EditorContext";
import { RootContext } from "@/context/RootContext";
import GarmentPuppet from "@/features/GarmentPuppet";
import GarmentSpecEditor from "@/features/GarmentSpecEditor";
import ItemToURL from "@/types/GarmentEncoder";
import GarmentTypes from "@/types/GarmentTypes";
import { useBodyID } from "@/util/hooks";
import axios from "axios";
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
    parseGarment();
  }, [encodedId, activeTask]);

  async function parseGarment() {
    if (typeof encodedId !== "string") return;

    let garment = activeTask?.garment;
    if (!garment) {
      const garmentId = ItemToURL.decode(encodedId);

      await axios
        .get(`/api/garment/${garmentId}`)
        .then((res) => (garment = res.data));

      setActiveTask({ action: "edit", garment });
    }

    setParsedGarment(GarmentTypes[garment?.type]?.from(garment));
  }

  return (
    <EditorContextProvider>
      <div className="edit-layout">
        <GarmentPuppet garment={parsedGarment} />

        <GarmentSpecEditor specs={parsedGarment?.specs} />
      </div>
    </EditorContextProvider>
  );
}
