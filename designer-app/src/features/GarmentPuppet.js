import Button from "@/components/Button";
import GarmentNameEditor from "@/components/GarmentNameEditor";
import PantsPuppet from "@/components/puppet/Pants";
import ShirtPuppet from "@/components/puppet/Shirt";
import Tooltip from "@/components/Tooltip";
import { EditorContext } from "@/context/EditorContext";
import { RootContext } from "@/context/RootContext";
import ItemToURL from "@/types/GarmentEncoder";
import {
  IconArrowBackUp,
  IconChevronLeft,
  IconChevronRight,
  IconCircleCheck,
  IconInfoCircle,
  IconLibraryPhoto,
  IconLoader2,
  IconSparkles,
} from "@tabler/icons-react";
import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";

/** @typedef {{ url: string, createdAt: string }} GarmentImage */

/** @typedef {{
  garment: GarmentInstance;
  updatedAt: Date;
  isGenerating?: boolean;
  visualizationUrl?: string;
  onGenerateVisualization?: () => void;
}} GarmentPuppetProps */

/** @type {{ [K in GarmentType]: React.FC<PuppetProps<?>> }} */
const Puppets = {
  Shirt: ShirtPuppet,
  Pants: PantsPuppet,
};

/** @param {GarmentPuppetProps} props */
const GarmentPuppet = (props) => {
  const { garment, updatedAt, isGenerating, visualizationUrl, onGenerateVisualization } = props;

  const { encodedId } = useRouter().query;

  const { bodyRef } = useContext(RootContext);
  const { updatedState } = useContext(EditorContext);
  const [lastUpdated, setLastUpdated] = updatedState;

  const [saving, setSaving] = useState(false);
  const [visualizing, setVisualizing] = useState(false);
  const [lastSaved, setLastSaved] = useState(formatSaveDate(updatedAt));
  const debounceUpdateRef = useRef(null);
  const pollIntervalRef = useRef(null);

  const [viewingGallery, setViewingGallery] = useState(false);
  const [currImageIdx, setCurrImageIdx] = useState(-1);
  const [images, setImages] = useState([]);

  /** @type {GarmentImage} */
  const currImage = images?.[currImageIdx];
  const imgDate = formatSaveDate(new Date(currImage?.createdAt));

  /** @type {ValueOf<Puppets>} */
  const Puppet = Puppets[garment?.type];

  useEffect(() => {
    if (!garment?.images) return;

    setImages([...garment.images].reverse());
    setCurrImageIdx(0);
  }, [garment]);

  useEffect(() => {
    if (updatedAt) setLastSaved(formatSaveDate(updatedAt));
  }, [updatedAt]);

  useEffect(() => {
    if (!lastUpdated || !garment) {
      return () => clearTimeout(debounceUpdateRef.current);
    }

    debounceUpdateRef.current = setTimeout(() => {
      if (typeof encodedId !== "string") return;

      const garmentId = ItemToURL.decode(encodedId);
      if (!garmentId) return;

      setSaving(true);
      axios
        .put(`/api/garment/${garmentId}`, { garment: garment?.serialize() })
        .then(() => setLastSaved(formatSaveDate(new Date())))
        .catch(console.log)
        .finally(() => setSaving(false));
    }, 1000);

    return () => clearTimeout(debounceUpdateRef.current);
  }, [lastUpdated]);

  /** @param {Date} date */
  function formatSaveDate(date) {
    const day = date?.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    const time = date?.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    if (!day || !time) return "";

    return `${day} at ${time}`;
  }

  async function visualize() {
    if (typeof encodedId !== "string") return;

    const garmentId = ItemToURL.decode(encodedId);
    if (!garmentId) return;

    setVisualizing(true);
    try {
      // Start the visualization process
      const response = await axios.patch(`/api/garment/${garmentId}/visualize`);
      
      if (response.status === 202) {
        // Start polling for updates
        pollIntervalRef.current = setInterval(async () => {
          const statusRes = await axios.get(`/api/garment/${garmentId}`);
          const updatedGarment = statusRes.data;
          
          if (updatedGarment.images?.length > (garment?.images?.length || 0)) {
            // New image has been generated
            clearInterval(pollIntervalRef.current);
            setVisualizing(false);
            setViewingGallery(true);
            
            // Update local state with new image
            const newImage = {
              url: updatedGarment.images[0].url,
              createdAt: new Date().toISOString()
            };
            
            // Update images array
            const newImages = [newImage, ...(images || [])];
            setImages(newImages);
            setCurrImageIdx(0);
            
            // Update the parent component's state
            setLastUpdated(Date.now());
          }
        }, 5000);

        // Stop polling after 5 minutes
        setTimeout(() => {
          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
            setVisualizing(false);
          }
        }, 300000);
      }
    } catch (error) {
      console.error('Error starting visualization:', error);
      setVisualizing(false);
    }
  }

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="garment-preview">
      <GarmentNameEditor garment={garment} />

      <div className="puppet-box">
        <div className={clsx("last-updated", saving && "saving")}>
          <Tooltip
            content={`Last saved ${lastSaved}`}
            placement="left"
            appendTo={bodyRef}
          >
            {saving ? (
              <IconLoader2 className="animate-spin" stroke={2.5} />
            ) : (
              <IconCircleCheck stroke={2.5} />
            )}
          </Tooltip>
        </div>

        {Puppet && <Puppet specs={garment?.specMap()} />}

        <div
          className={clsx("gallery-box", viewingGallery && "viewing")}
          // @ts-ignore
          inert={viewingGallery ? undefined : ""}
        >
          <img src={currImage?.url} />

          {currImageIdx + 1 < images?.length && (
            <Tooltip
              content="Prev. Image"
              appendTo={bodyRef}
              placement="top-start"
            >
              <Button
                variant="secondary"
                className="absolute bottom-[0.5rem] left-[0.5rem]"
                bgColor="var(--background-main)"
                icon={<IconChevronLeft />}
                onClick={() => setCurrImageIdx(currImageIdx + 1)}
                fontSize="1.5rem"
                xPad="0.3rem"
                yPad="0.3rem"
              />
            </Tooltip>
          )}

          {currImageIdx > 0 && (
            <Tooltip
              content="Next Image"
              appendTo={bodyRef}
              placement="top-end"
            >
              <Button
                variant="secondary"
                className="absolute bottom-[0.5rem] right-[0.5rem]"
                bgColor="var(--background-main)"
                icon={<IconChevronRight />}
                onClick={() => setCurrImageIdx(currImageIdx - 1)}
                fontSize="1.5rem"
                xPad="0.3rem"
                yPad="0.3rem"
              />
            </Tooltip>
          )}

          <Tooltip
            content={`Generated ${imgDate}`}
            placement="left"
            appendTo={bodyRef}
          >
            <IconInfoCircle className="img-gen-date" />
          </Tooltip>
        </div>
      </div>

      <div className="flex gap-[0.6rem]">
        <Button
          tint="aquamarine"
          label={visualizing ? "Generating..." : "Visualize"}
          icon={visualizing ? <IconLoader2 className="animate-spin" /> : <IconSparkles />}
          width="100%"
          onClick={visualize}
          disabled={visualizing}
        />
        {!!images?.length && (
          <Button
            variant="secondary"
            tint="aquamarine"
            icon={
              viewingGallery ? (
                <IconArrowBackUp className="!stroke-[2]" />
              ) : (
                <IconLibraryPhoto className="!stroke-[2]" />
              )
            }
            onClick={() => setViewingGallery(!viewingGallery)}
            fontSize="2rem"
            xPad="0.7rem"
            stretch
          />
        )}
      </div>
    </div>
  );
};

export default GarmentPuppet;
