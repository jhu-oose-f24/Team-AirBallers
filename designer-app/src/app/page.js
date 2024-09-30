"use client";

import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  if (mounted) document.body.id = "main-page";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Fragment>
      {imgSrc ? (
        <Image className="garment-img" src={imgSrc} alt="Generated garment" />
      ) : (
        <div className="garment-img empty">No Image Yet...</div>
      )}
      <div className="prompt">
        <input
          className="prompt-input"
          placeholder="Any ideas in mind?"
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          className="btn-prompt-generate"
          onClick={() => console.log(prompt)} // TODO: send prompt
        >
          Generate
        </button>
      </div>
    </Fragment>
  );
}
