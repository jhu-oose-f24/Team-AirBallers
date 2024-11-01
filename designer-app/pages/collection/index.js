"use client";

import Header from "@/components/Header";
import { useBodyID } from "@/util/hooks";
import axios from "axios";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useEffect, useState } from "react";

export default function Home() {
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

      <OverlayScrollbarsComponent className="collection-grid" defer>
        {garments.map((garment, idx) => (
          <img key={idx} src={garment.imageURL} />
        ))}
      </OverlayScrollbarsComponent>
    </>
  );
}
