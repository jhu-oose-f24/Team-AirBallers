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

    if (garmentId) {
      apiUrl = "api/prompt/edit";
    }

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
    <>
      {imgSrc ? (
        <img className="garment-img" src={imgSrc} alt="Generated garment" />
      ) : (
        <div className="garment-img empty">No Image Yet...</div>
      )}

      <div
        className="absolute flex flex-col left-[1rem] top-1/2 transform -translate-y-1/2"
        style={{ display: !garmentId && "none" }}
      >
        <b>Edit (Coming Soon)</b>
        <label htmlFor="sleeve-edit">Sleeve Length</label>
        <input
          id="sleeve-edit"
          className="edit-input sleeve max-w-[11rem]"
          placeholder="Length in cm."
          // onChange={(e) => setPrompt(e.target.value)}
          disabled
        />
        <label htmlFor="color-edit">Color</label>
        <input
          id="color-edit"
          className="edit-input color max-w-[11rem]"
          placeholder="e.g. #12AB34"
          // onChange={(e) => setPrompt(e.target.value)}
          disabled
        />
      </div>

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
    </>
  );
}
