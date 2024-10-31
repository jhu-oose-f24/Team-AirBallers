"use client";

import Button from "@/components/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useEffect, useState } from "react";

/**
 * @typedef {Awaited<
 *   ReturnType<import("@/util/db.js")["default"]["prompt"]["findMany"]>
 * >} GarmentList
 */
export default function SideMenu({ isOpen, toggleMenu }) {
  const router = useRouter();

  /** @type {UseState<GarmentList>} */
  const [garments, setGarments] = useState([]);

  useEffect(() => {
    axios
      .get("/api/collection")
      .then(({ data }) => setGarments(data.reverse())) // Reverse the order of garments here
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={`side-menu ${isOpen ? "open" : "closed"}`}>
      <OverlayScrollbarsComponent className="garment-list" defer>
        {garments.length > 0 ? (
          garments.map((garment, idx) => (
            <Button
              key={idx}
              image={garment.imageURL}
              // TODO: move to collection page
              // onClick={() => router.push(`/garment/${garment.id}`)}
            />
          ))
        ) : (
          <p>No garments available</p>
        )}
      </OverlayScrollbarsComponent>

      <Button
        tint="aquamarine"
        label="View Full Collection"
        onClick={() => router.push("/collection", { scroll: false })}
        xPad="0.7rem"
        yPad="0.35rem"
      />
    </div>
  );
}
