import randomExamplePrompt from "@/assets/examplePrompts";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { RootContext } from "@/context/RootContext";
import ItemToURL from "@/types/GarmentEncoder";
import { useBodyID } from "@/util/hooks";
import {
  IconClothesRack,
  IconHanger2,
  IconSearch,
  IconShirtFilled,
  IconSparkles,
} from "@tabler/icons-react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Create() {
  const router = useRouter();

  const { setHeaderState, setActiveTask } = useContext(RootContext);

  const [examplePrompt, setExamplePrompt] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);

  useBodyID("create");

  useEffect(() => {
    setHeaderState({ title: "Designer-App" });
    setExamplePrompt(randomExamplePrompt());
  }, []);

  function createGarment() {
    if (generating) return;

    setGenerating(true);
    axios
      .post("/api/garment/create", { prompt })
      .then((res) => {
        /** @type {Garment} */
        const garment = res.data;

        if (garment) {
          const garmentURL = ItemToURL.encode(garment.id);
          if (!garmentURL) return;

          setActiveTask({ action: "edit", garment });
          router.replace(`garment/${garmentURL}/edit`);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setGenerating(false));
  }

  return (
    <div className="create-layout">
      <Head>
        <title>Create | Designer App</title>
      </Head>

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
