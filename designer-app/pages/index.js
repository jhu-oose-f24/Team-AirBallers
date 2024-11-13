"use client";

import randomExamplePrompt from "@/assets/examplePrompts";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { RootContext } from "@/components/RootLayout";
import { useBodyID } from "@/util/hooks";
import { IconSearch, IconSparkles } from "@tabler/icons-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { setHeaderState } = useContext(RootContext);

  const [examplePrompt, setExamplePrompt] = useState("");
  const [prompt, setPrompt] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [garmentId, setGarmentId] = useState(null);
  const [generating, setGenerating] = useState(false);

  useBodyID("home");

  useEffect(() => {
    setHeaderState({ title: "Designer-App" });
    setExamplePrompt(randomExamplePrompt());
  }, []);

  function getResponse() {
    if (generating) return;

    let apiUrl = "/api/prompt";
    let body = { prompt };

    // TODO: not ready for edit
    // if (garmentId) {
    //   apiUrl = "api/prompt/edit";
    // }

    setGenerating(true);
    axios
      .post(apiUrl, { prompt })
      .then(({ data }) => {
        setGarmentId(data.id);
        setImgSrc(data.url);
      })
      .catch((err) => console.log(err))
      .finally(() => setGenerating(false));
  }

  return (
    <div className="create-layout">
      {imgSrc ? (
        <img className="garment-img" src={imgSrc} alt="Generated garment" />
      ) : (
        <div className="garment-img empty">No Image Yet...</div>
      )}

      <div className="prompt">
        <InputField
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
          onClick={getResponse}
          xPad="0.7rem"
          yPad="0.35rem"
          disabled={!prompt?.trim()}
        />
      </div>
    </div>
  );
}
