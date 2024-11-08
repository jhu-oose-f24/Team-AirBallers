"use client";

import Button from "@/components/Button";
import CollectionPreview from "@/components/CollectionPreview";
import { RootContext } from "@/components/RootLayout";
import ScrollContainer from "@/components/ScrollContainer";
import Stitches from "@/components/Stitches";
import { IconHanger, IconPlus } from "@tabler/icons-react";
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
  const { sideBarOpen, setSideBarRef } = useContext(RootContext);

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
    <div
      className={clsx("sidebar", sideBarOpen ? "open" : "closed")}
      ref={setSideBarRef}
    >
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

      <Button
        variant="secondary"
        icon={<IconHanger />}
        label="New Garment"
        align="left"
        xPad="1.1rem"
        width="100%"
        size="sm"
        // TODO: onClick: redirect to create new garment
      />
      <Button
        icon={<IconPlus />}
        label="New Collection"
        width="100%"
        size="sm"
        // TODO: onClick: modal to create collection
      />
    </div>
  );
};

export default SideBar;
