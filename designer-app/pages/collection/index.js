"use client";

import Header from "@/components/Header";
import { useBodyID } from "@/util/hooks";
import axios from "axios";
import { useEffect, useState } from "react";

/**
 * @typedef {Awaited<
 *   ReturnType<import("@/util/db.js")["default"]["prompt"]["findMany"]>
 * >} GarmentList
 */
export default function Home() {
  /** @type {UseState<GarmentList>} */
  const [garments, setGarments] = useState([]);

  useBodyID("collection-page");

  useEffect(() => {
    axios
      .get("/api/collection")
      .then(({ data }) => setGarments(data.reverse())) // Reverse the order of garments here
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
