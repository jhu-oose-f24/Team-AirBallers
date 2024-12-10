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

/** @type {{ [K in GarmentType]: React.FC<PuppetProps<?>> }} */
const Puppets = {
  Shirt: ShirtPuppet,
  Pants: PantsPuppet,
};

/** @param {{ garment: GarmentInstance; updatedAt: Date }} props */
const GarmentPuppet = (props) => {
  const { garment, updatedAt } = props;

  const { encodedId } = useRouter().query;

  const { bodyRef } = useContext(RootContext);
  const { updatedState } = useContext(EditorContext);
  const [lastUpdated, setLastUpdated] = updatedState;

  const [saving, setSaving] = useState(false);
  const [visualizing, setVisualizing] = useState(false);
  const [lastSaved, setLastSaved] = useState(formatSaveDate(updatedAt));
  const debounceUpdateRef = useRef(null);

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

  function visualize() {
    if (typeof encodedId !== "string") return;

    const garmentId = ItemToURL.decode(encodedId);
    if (!garmentId) return;

    setVisualizing(true);
    axios
      .patch(`/api/garment/${garmentId}/visualize`)
      .then((res) => {
        /** @type {GarmentImage["url"]} */
        const url = res.data;
        garment.addImage(url);

        setViewingGallery(true);
        setLastUpdated(Date.now());
        setImages([...garment.images].reverse());
        setCurrImageIdx(0);
      })
      .catch(console.log)
      .finally(() => setVisualizing(false));
  }

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
          label="Visualize"
          icon={<IconSparkles />}
          width="100%"
          onClick={visualize}
          loading={visualizing}
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
