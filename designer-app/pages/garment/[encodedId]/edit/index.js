import EditorContextProvider from "@/context/EditorContext";
import { RootContext } from "@/context/RootContext";
import GarmentPuppet from "@/features/GarmentPuppet";
import GarmentSpecEditor from "@/features/GarmentSpecEditor";
import ItemToURL from "@/types/GarmentEncoder";
import GarmentTypes from "@/types/GarmentTypes";
import { useBodyID } from "@/util/hooks";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function Editor() {
  const { encodedId } = useRouter().query;

  const { setHeaderState, activeTask, setActiveTask } = useContext(RootContext);

  /** @type {UseState<GarmentInstance>} */
  const [parsedGarment, setParsedGarment] = useState(null);
  const [validGarment, setValidGarment] = useState(undefined);
  const [lastUpdate, setLastUpdate] = useState(null);

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

      if (garmentId) {
        await axios
          .get(`/api/garment/${garmentId}`)
          .then((res) => {
            garment = res.data;
            setActiveTask({ action: "edit", garment });
          })
          .catch(console.log);
      }
    }

    if (garment) {
      setLastUpdate(new Date(garment?.updatedAt));
      setParsedGarment(GarmentTypes[garment?.type]?.from(garment));
      setValidGarment(true);
    } else {
      setValidGarment(false);
    }
  }

  return (
    <EditorContextProvider>
      <div
        className="edit-layout"
        // @ts-ignore
        inert={validGarment ? undefined : ""}
      >
        <Head>
          <title>Editing Garment: {parsedGarment?.name} | Designer App</title>
        </Head>

        <GarmentPuppet updatedAt={lastUpdate} garment={parsedGarment} />

        <GarmentSpecEditor specs={parsedGarment?.specs} />
      </div>
    </EditorContextProvider>
  );
}
