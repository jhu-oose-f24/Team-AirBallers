"use client";

import Header from "@/components/Header";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [garmentId, setGarmentId] = useState(null);
  const [generating, setGenerating] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuToggle(isOpen) {
    setIsMenuOpen(isOpen);
  }

  if (mounted) document.body.id = "home";

  useEffect(() => {
    setMounted(true);
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
      <Header title="Designer-App"/>

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
        <input
          className="prompt-input"
          placeholder="Any ideas in mind?"
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button className="btn-prompt-generate" onClick={getResponse}>
          {generating ? "Loading..." : "Generate"}
        </button>
      </div>
    </>
  );
}
