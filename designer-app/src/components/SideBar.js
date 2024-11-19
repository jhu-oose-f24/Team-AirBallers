"use client";

import Button from "@/components/Button";
import CollectionPreview from "@/components/CollectionPreview";
import ScrollContainer from "@/components/ScrollContainer";
import Stitches from "@/components/Stitches";
import { RootContext } from "@/context/RootContext";
import { SideBarContext } from "@/context/SideBarContext";
import DeleteCollectionModal from "@/features/DeleteCollectionModal";
import RenameCollectionModal from "@/features/RenameCollectionModal";
import { pause } from "@/util/misc";
import { IconHanger, IconPlus } from "@tabler/icons-react";
import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const SideBar = () => {
  const { sideBarOpen, setSideBarRef } = useContext(RootContext);
  const { openMenuRef } = useContext(SideBarContext);

  const router = useRouter();

  // TODO: refactor with collections
  /** @type {UseState<Garment[]>} */
  const [garments, setGarments] = useState([]);

  useEffect(() => {
    axios
      .get("/api/collection")
      .then(({ data }) => setGarments(data.reverse())) // Reverse the order of garments here
      .catch((err) => console.log(err));
  }, []);

  async function hideOpenMenu() {
    const lastOpen = openMenuRef.current;
    await pause(100);
    lastOpen?.state.isShown && lastOpen?.hide();
  }

  return (
    <div
      className={clsx("sidebar", sideBarOpen ? "open" : "closed")}
      ref={setSideBarRef}
    >
      <span className="header">Collections</span>

      <Stitches type="line" stitchWidth="0.17rem" svgClass="stitch-open" />
      <ScrollContainer className="collection-list" onScroll={hideOpenMenu}>
        {/* TODO: create actual cards from collections */}
        <CollectionPreview garments={garments?.slice(0, 5)} />
        <CollectionPreview garments={garments?.slice(5, 7)} />
        <CollectionPreview garments={garments?.slice(7, 15)} />
        <CollectionPreview garments={garments?.slice(15, 40)} />
        <CollectionPreview garments={garments?.slice(40, 43)} />
        <CollectionPreview garments={garments?.slice(43, 48)} />
        <CollectionPreview garments={garments?.slice(48)} />
      </ScrollContainer>
      <Stitches type="line" stitchWidth="0.17rem" svgClass="stitch-close" />

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
      <RenameCollectionModal />
      <DeleteCollectionModal />
    </div>
  );
};

export default SideBar;
