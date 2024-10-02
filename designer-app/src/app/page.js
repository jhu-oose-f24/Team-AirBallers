"use client";

import axios from "axios";
import { Fragment, useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [generating, setGenerating] = useState(false);

  if (mounted) document.body.id = "main-page";

  useEffect(() => {
    setMounted(true);
  }, []);

  function getResponse() {
    if (generating) return;

    setGenerating(true);
    axios
      .post("http://localhost:4000/prompt", { prompt })
      .then((res) => {
        const { url } = res.data.data;
        setImgSrc(url);
        setGenerating(false);
      })
      .catch((err) => {
        console.log(err);
        setGenerating(false);
      });
  }

  return (
    <Fragment>
      {imgSrc ? (
        <img className="garment-img" src={imgSrc} alt="Generated garment" />
      ) : (
        <div className="garment-img empty">No Image Yet...</div>
      )}
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
    </Fragment>
  );
}
