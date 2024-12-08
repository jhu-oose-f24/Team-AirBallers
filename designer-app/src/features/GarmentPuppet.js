import Button from "@/components/Button";
import GarmentNameEditor from "@/components/GarmentNameEditor";
import ShirtPuppet from "@/components/puppet/Shirt";
import { EditorContext } from "@/context/EditorContext";
import ItemToURL from "@/types/GarmentEncoder";
import {
  IconCircleCheck,
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
  Pants: null, // TODO
};

/** @param {{ garment: GarmentInstance; updatedAt: Date }} props */
const GarmentPuppet = (props) => {
  const { garment, updatedAt } = props;

  const { encodedId } = useRouter().query;

  const [lastUpdated, _] = useContext(EditorContext).updatedState;

  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(formatSaveDate(updatedAt));
  const debounceUpdateRef = useRef(null);

  /** @type {ValueOf<Puppets>} */
  const Puppet = Puppets[garment?.type];

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

  return (
    <div className="garment-preview">
      <GarmentNameEditor garment={garment} />

      <div className="puppet-box">
        <div className={clsx("last-updated", saving && "saving")}>
          <span>
            {saving ? "Saving" : lastSaved && `Last saved ${lastSaved}`}
          </span>

          {saving ? (
            <IconLoader2 className="animate-spin" stroke={2.5} />
          ) : (
            <IconCircleCheck stroke={2.5} />
          )}
        </div>

        {Puppet && <Puppet specs={garment?.specMap()} />}
      </div>

      <Button
        tint="aquamarine"
        label="Visualize"
        icon={<IconSparkles />}
        width="100%"
      />
    </div>
  );
};

export default GarmentPuppet;
