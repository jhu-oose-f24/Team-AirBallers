import Button from "@/components/Button";
import CollectionPreview from "@/components/CollectionPreview";
import ScrollContainer from "@/components/ScrollContainer";
import Stitches from "@/components/Stitches";
import { RootContext } from "@/context/RootContext";
import { SideBarContext } from "@/context/SideBarContext";
import DeleteItemModal from "@/features/DeleteItemModal";
import RenameItemModal from "@/features/RenameItemModal";
import { pause } from "@/util/misc";
import { IconHanger, IconPlus } from "@tabler/icons-react";
import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const SideBar = () => {
  const router = useRouter();

  const { sideBarOpen, sideBarRef, setSideBarRef } = useContext(RootContext);
  const { openMenuRef, activeTask, setActiveTask } = useContext(SideBarContext);

  /** @type {UseState<(Collection & { garments: Garment[] })[]>} */
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    if (sideBarRef?.classList.contains("closed")) {
      sideBarRef.style.visibility = "hidden";
    }
  }, [sideBarRef]);

  useEffect(() => {
    axios
      .get("/api/collections")
      .then(({ data }) => setCollections(data.reverse())) // Reverse the order of garments here
      .catch(console.log);
  }, []);

  async function createCollection(name) {
    try {
      const { data } = await axios.post("/api/collection", { name });
      setCollections((prev) => [data, ...prev]);
    } catch (err) {
      console.error("Error creating collection:", err);
    }
  }



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
        {collections?.map((collection, idx) => (
          <CollectionPreview key={idx} collection={collection} />
        ))}
      </ScrollContainer>
      <Stitches type="line" stitchWidth="0.17rem" svgClass="stitch-close" />

      <div className="flex flex-col gap-[0.6rem]">
        <Button
          variant="secondary"
          icon={<IconHanger className="-scale-x-[1]" />}
          label="New Garment"
          align="left"
          xPad="1.1rem"
          width="100%"
          size="sm"
          onClick={() => router.replace("/create")}
          // TODO: onClick: redirect to create new garment
        />
        <Button
          icon={<IconPlus />}
          label="New Collection"
          width="100%"
          size="sm"
          // TODO: onClick: modal to create collection
          onClick={() => {
            const name = prompt("Enter Collection Name:");
            if (name) createCollection(name);
          }}
        />
      </div>

      <RenameItemModal
        title="Rename Collection"
        inputLabel="Collection Name"
        originalName="(Unknown)"
        activeTask={activeTask}
        setActiveTask={setActiveTask}
        // TODO: save collection name
        onSaveClick={null}
      />

      <DeleteItemModal
        title="Delete Collection"
        activeTask={activeTask}
        setActiveTask={setActiveTask}
      >
        {/* TODO: get collection name and # garments */}
        <p>
          The <b>(Collection Name)</b> collection will be permanently deleted
          along with the following contents:
        </p>
        <ul>
          <li>
            <b>(Number)</b> Garments
          </li>
        </ul>
        <br />
      </DeleteItemModal>
    </div>
  );
};

export default SideBar;
