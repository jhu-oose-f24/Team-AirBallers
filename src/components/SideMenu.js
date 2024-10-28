// src/app/components/SideMenu.js
import React from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * @typedef {Awaited<
*   ReturnType<import("@/util/db.js")["default"]["prompt"]["findMany"]>
* >} GarmentList
*/
export default function SideMenu({ isOpen, toggleMenu }) {
    const router = useRouter();

    /**
     * @type {[
     *   GarmentList,
     *   React.Dispatch<React.SetStateAction<GarmentList>>,
     * ]}
    */
   const [garments, setGarments] = useState([]);

   useEffect(() => {

    axios
      .get("/api/collection")
      .then(({ data }) => setGarments(data.reverse())) // Reverse the order of garments here
      .catch((err) => console.log(err));
  }, []);

    return (
        <div className={`side-menu ${isOpen ? "open" : "closed"}`}>
            <button className="btn-hamburger" onClick={toggleMenu}>
                <Bars3Icon className="h-8 w-8 text-black" />
            </button>
            
            <div className="garment-list">
                {garments.length > 0 ? (
                garments.map((garment, idx) => (
                    <img
                    key={idx}
                    src={garment.imageURL}
                    alt={`Garment ${idx + 1}`}
                    className="garment-img"
                    />
                ))
                ) : (
                <p>No garments available</p>
                )}
            </div>

            <button
                className="btn-collection"
                onClick={() => router.push("/collection", { scroll: false })}
            >
                View Full Collection
            </button>
        </div>
  );
}
