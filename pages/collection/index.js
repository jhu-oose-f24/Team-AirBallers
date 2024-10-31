"use client"

import Header from "@/components/Header";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [garments, setGarments] = useState([]);

  if (mounted) document.body.id = "collection-page";

  useEffect(() => {
    setMounted(true);

    axios
      .get("/api/collection")
      .then(({ data }) => setGarments(data.reverse()))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header title="< Garment Collection" />

      <div className="collection-grid grid gap-4 p-4 min-h-screen overflow-y-auto">
        {garments.map((garment, idx) => (
          <img key={idx} src={garment.imageURL} className="w-full h-auto" />
        ))}
      </div>
    </>
  );
}
