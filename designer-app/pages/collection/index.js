"use client";

import { RootContext } from "@/components/RootLayout";
import { useBodyID } from "@/util/hooks";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const { setHeaderState } = useContext(RootContext);

  const [garments, setGarments] = useState([]);

  useBodyID("collection-page");

  useEffect(() => {
    setHeaderState({
      title: "Garment Collection",
      back: "/",
    });

    axios
      .get("/api/collection")
      .then(({ data }) => setGarments(data.reverse()))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="collection-grid">
      {garments.map((garment, idx) => (
        <img key={idx} src={garment.imageURL} />
      ))}
    </div>
  );
}
