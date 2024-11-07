"use client";

import CollectionPreview from "@/components/CollectionPreview";
import { RootContext } from "@/components/RootLayout";
import ScrollContainer from "@/components/ScrollContainer";
import Stitches from "@/components/Stitches";
import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

/**
 * @typedef {Awaited<
 *   ReturnType<import("@/util/db.js")["default"]["prompt"]["findMany"]>
 * >} GarmentList
 */
const SideBar = () => {
  const router = useRouter();
  const { sideBarOpen } = useContext(RootContext);

  /** @type {UseState<GarmentList>} */
  const [garments, setGarments] = useState([]);

  useEffect(() => {
    axios
      .get("/api/collection")
      .then(({ data }) => setGarments(data.reverse())) // Reverse the order of garments here
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={clsx("sidebar", sideBarOpen ? "open" : "closed")}>
      <span className="header">
        Collections
        <Stitches type="line" stitchWidth="0.17rem" />
      </span>

      <ScrollContainer className="collection-list">
        {/* TODO: create actual cards from collections */}
        <CollectionPreview garments={garments?.slice(0, 5)} />
        <CollectionPreview garments={garments?.slice(5, 7)} />
        <CollectionPreview garments={garments?.slice(7, 15)} />
        <CollectionPreview garments={garments?.slice(15, 40)} />
        <CollectionPreview garments={garments?.slice(40, 43)} />
        <CollectionPreview garments={garments?.slice(43, 48)} />
        <CollectionPreview garments={garments?.slice(48)} />
      </ScrollContainer>
    </div>
  );
};

export default SideBar;
