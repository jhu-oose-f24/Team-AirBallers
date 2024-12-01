"use client";

import randomExamplePrompt from "@/assets/examplePrompts";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { RootContext } from "@/context/RootContext";
import GarmentEncoder from "@/types/GarmentEncoder";
import Shirt from "@/types/garments/Shirt";
import { useBodyID } from "@/util/hooks";
import { pause } from "@/util/misc";
import {
  IconClothesRack,
  IconHanger2,
  IconSearch,
  IconShirtFilled,
  IconSparkles,
} from "@tabler/icons-react";
// import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { setHeaderState, setActiveTask } = useContext(RootContext);

  const [examplePrompt, setExamplePrompt] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);

  useBodyID("home");

  useEffect(() => {
    setHeaderState({ title: "Designer-App" });
    setExamplePrompt(randomExamplePrompt());

    setActiveTask(null);
  }, []);

  function createGarment() {
    if (generating) return;

    // Testing flow from home to edit page

    /** @ts-ignore @type {Garment} */
    const garment = new Shirt().serialize();
    garment.id = "674b7e80e94e6a3a2e256970"; // example MongoDB id

    setGenerating(true);
    pause(1000)
      .then(() => {
        // axios
        // .post("/api/prompt", { prompt })
        // .then(({ data }) => {
        // /** @type {Garment} */
        // const garment = data.garment;
        setActiveTask({ action: "edit", garment });

        const garmentURL = GarmentEncoder.encode(garment);
        router.replace(`garment/${garmentURL}/edit`);
      })
      .catch((err) => console.log(err))
      .finally(() => setGenerating(false));
  }

  return (
    <div className="create-layout">
      <div className="garment-img">
        <div className="garment-placeholder">
          <IconHanger2 className="garment-icon hanger" />
          <IconShirtFilled className="garment-icon shirt" />
          <IconClothesRack className="garment-icon rack" />
        </div>
      </div>

      <div className="prompt">
        <InputField
          id="prompt-input"
          textArea
          wrapText
          className="prompt-input"
          placeholder={examplePrompt}
          iconLeft={<IconSearch />}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button
          tint="aquamarine"
          icon={<IconSparkles />}
          label="Generate"
          loading={generating}
          onClick={createGarment}
          xPad="0.7rem"
          yPad="0.35rem"
          disabled={!prompt?.trim()}
        />
      </div>
    </div>
  );
}
