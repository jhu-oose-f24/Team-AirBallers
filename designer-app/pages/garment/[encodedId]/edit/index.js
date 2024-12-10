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
import { useContext, useEffect, useState, useCallback } from "react";

export default function Editor() {
  const { encodedId } = useRouter().query;

  const { setHeaderState, activeTask, setActiveTask } = useContext(RootContext);

  /** @type {UseState<GarmentInstance>} */
  const [parsedGarment, setParsedGarment] = useState(null);
  const [validGarment, setValidGarment] = useState(undefined);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [visualizationUrl, setVisualizationUrl] = useState(null);

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

  const checkVisualizationStatus = useCallback(async (garmentId) => {
    try {
      const response = await axios.get(`/api/garment/${garmentId}`);
      const garment = response.data;
      
      if (garment.visualizationUrl) {
        setVisualizationUrl(garment.visualizationUrl);
        setIsGenerating(false);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error checking visualization status:', error);
      return false;
    }
  }, []);

  const startVisualization = useCallback(async (garment) => {
    if (!garment?.id) return;
    
    setIsGenerating(true);
    
    try {
      // Create a unique webhook URL for this request
      const webhookUrl = `${process.env.NEXT_PUBLIC_API_URL}/webhook/visualization/${garment.id}`;
      
      // Start the visualization process
      const response = await axios.patch(
        `/api/garment/${garment.id}/visualize`,
        { webhookUrl }
      );

      if (response.status === 202) {
        // Poll for updates every 5 seconds
        const pollInterval = setInterval(async () => {
          const isComplete = await checkVisualizationStatus(garment.id);
          if (isComplete) {
            clearInterval(pollInterval);
          }
        }, 5000);

        // Stop polling after 5 minutes (adjust as needed)
        setTimeout(() => {
          clearInterval(pollInterval);
          setIsGenerating(false);
        }, 300000);
      }
    } catch (error) {
      console.error('Error starting visualization:', error);
      setIsGenerating(false);
    }
  }, [checkVisualizationStatus]);

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

        <GarmentPuppet 
          updatedAt={lastUpdate} 
          garment={parsedGarment}
          isGenerating={isGenerating}
          visualizationUrl={visualizationUrl}
          onGenerateVisualization={() => startVisualization(parsedGarment)}
        />

        <GarmentSpecEditor specs={parsedGarment?.specs} />
      </div>
    </EditorContextProvider>
  );
}
