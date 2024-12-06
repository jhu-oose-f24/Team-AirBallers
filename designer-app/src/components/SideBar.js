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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const SideBar = () => {
  const router = useRouter();

  const session = useSession();
  const signedIn = session?.status === "authenticated";

  const { sideBarOpen, sideBarRef, setSideBarRef } = useContext(RootContext);
  const { openMenuRef, activeTask, setActiveTask } = useContext(SideBarContext);
  /** @ts-ignore @type {CollectionWithGarments} */
  const activeCollection = activeTask?.collection;

  /** @type {UseState<CollectionWithGarments[]>} */
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    if (sideBarRef?.classList.contains("closed")) {
      sideBarRef.style.visibility = "hidden";
    }
  }, [sideBarRef]);

  useEffect(() => {
    if (!signedIn) return;

    fetchCollections();
  }, [signedIn]);

  async function fetchCollections() {
    axios
      .get("/api/collections")
      .then(({ data }) => setCollections(data.reverse()))
      .catch(console.log);
  }

  /** @param {string} name */
  async function createCollection(name) {
    axios
      .post("/api/collection/create", { name })
      .then((res) => {
        const newCollection = res.data;
        setCollections((prev) => [newCollection, ...prev]);
      })
      .catch(console.log);
  }

  async function hideOpenMenu() {
    const lastOpen = openMenuRef.current;
    await pause(100);
    lastOpen?.state.isShown && lastOpen?.hide();
  }

  function saveRenamedCollection(newName = "Untitled") {
    if (!activeCollection?.id) return false;

    return axios
      .put(`/api/collection/${activeCollection.id}`, {
        ...activeCollection,
        name: newName,
      })
      .then(() => (fetchCollections(), true))
      .catch((err) => (console.log(err), false));
  }

  function deleteCollection() {
    if (!activeCollection?.id) return false;

    return axios
      .delete(`/api/collection/${activeCollection.id}`)
      .then(() => (fetchCollections(), true))
      .catch((err) => (console.log(err), false));
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
        {!signedIn && (
          <div className="sign-in-for-collections">
            <span className="text-primary-darker/80">Nothing Here!</span>
            <span className="text-[1.3rem] font-normal">
              Sign in to save your creations and manage collections
            </span>
          </div>
        )}
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
          disabled={!signedIn}
        />
      </div>

      <RenameItemModal
        title="Rename Collection"
        inputLabel="Collection Name"
        originalName={activeCollection?.name}
        activeTask={activeTask}
        setActiveTask={setActiveTask}
        onSaveClick={saveRenamedCollection}
      />

      <DeleteItemModal
        title="Delete Collection"
        activeTask={activeTask}
        setActiveTask={setActiveTask}
        onConfirmDelete={deleteCollection}
      >
        <p>
          The <b>{activeCollection?.name}</b> collection will be permanently
          deleted along with the following contents:
        </p>
        <ul>
          <li>
            <b>{activeCollection?.garments?.length}</b> Garments
          </li>
        </ul>
        <br />
      </DeleteItemModal>
    </div>
  );
};

export default SideBar;
