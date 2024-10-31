"use client"

import Header from "@/components/Header";
import { useBodyID } from "@/util/hooks";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  /** @type {UseState<GarmentList>} */
  const [garments, setGarments] = useState([]);

  useBodyID("collection-page");

  useEffect(() => {
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
