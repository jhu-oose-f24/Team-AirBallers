"use client";

import Header from "@/components/Header";
import axios from "axios";
import { useEffect, useState } from "react";

/**
 * @typedef {Awaited<
 *   ReturnType<import("@/util/db.js")["default"]["prompt"]["findMany"]>
 * >} GarmentList
 */
export default function Home() {
  const [mounted, setMounted] = useState(false);

  /**
   * @type {[
   *   GarmentList,
   *   React.Dispatch<React.SetStateAction<GarmentList>>,
   * ]}
   */
  const [garments, setGarments] = useState([]);

  if (mounted) document.body.id = "collection-page";

  useEffect(() => {
    setMounted(true);

    axios
      .get("/api/collection")
      .then(({ data }) => setGarments(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header title="< Garment Collection" />

      <div className="collection-grid">
        {garments.map((garment, idx) => (
          <img key={idx} src={garment.imageURL} />
        ))}
      </div>
    </>
  );
}
