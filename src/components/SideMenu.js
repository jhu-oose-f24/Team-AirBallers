// src/app/components/SideMenu.js
import React from "react";
import { IconMenu2 } from "@tabler/icons-react";
import axios from "axios";
import Button from "@/components/Button";
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
            {/* <button className="btn-hamburger" onClick={toggleMenu}>
                <Bars3Icon className="h-8 w-8 text-black" />
            </button> */}

            <Button
                tint="aquamarine"
                icon={<IconMenu2 />}
                onClick={toggleMenu}
                width={"3.5rem"}
                height={"3.5rem"}
            />
            
            <div className="garment-list">
                {garments.length > 0 ? (
                garments.map((garment, idx) => (
                    <Button
                        key={idx}
                        image={garment.imageURL}
                        onClick={() => router.push(`/garment/${garment.id}`)}
                        tint="aquamarine"
                    />
                ))
                ) : (
                <p>No garments available</p>
                )}
            </div>

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
