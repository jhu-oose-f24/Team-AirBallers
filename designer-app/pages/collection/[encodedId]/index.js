import GarmentCard from "@/components/GarmentCard";
import { RootContext } from "@/context/RootContext";
import DeleteItemModal from "@/features/DeleteItemModal";
import MoveGarmentModal from "@/features/MoveGarmentModal";
import RenameItemModal from "@/features/RenameItemModal";
import ItemToURL from "@/types/GarmentEncoder";
import GarmentTypes from "@/types/GarmentTypes";
import { useBodyID, useOnResize } from "@/util/hooks";
import { pause } from "@/util/misc";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function CollectionView() {
  // prettier-ignore
  const {
    sideBarOpen,
    setHeaderState,
    activeTask,
    setActiveTask,
  } = useContext(RootContext);

  const { encodedId } = useRouter().query;

  /** @type {UseState<HTMLElement>} */
  const [gridRef, setGridRef] = useState(null);
  const [numCols, setNumCols] = useState(-1);

  /** @type {UseState<CollectionWithGarments>} */
  const [collection, setCollection] = useState(null);
  const [garments, setGarments] = useState([]);

  useBodyID("collection-page");

  useOnResize(() => calcGridColumns(), [gridRef]);

  useEffect(() => {
    if (!collection || !gridRef) return;

    if (numCols < 0) {
      const delaySeconds = getComputedStyle(gridRef).transitionDuration;
      pause(parseFloat(delaySeconds) * 1000).then(calcGridColumns);
    } else {
      calcGridColumns();
    }
  }, [collection, gridRef, sideBarOpen]);

  useEffect(() => {
    setHeaderState({ back: "/create" });

    fetchCollection();
  }, [encodedId]);

  function calcGridColumns() {
    const firstCard = gridRef?.firstChild;
    if (!(firstCard instanceof HTMLElement)) return;

    const gridWidth = gridRef.clientWidth;

    const cardWidth = firstCard.clientWidth;
    const gridStyle = getComputedStyle(gridRef);
    const gridGap = parseInt(gridStyle?.columnGap);
    const gridPad = parseInt(gridStyle?.paddingInline);
    const gridSpace = gridWidth - 2 * gridPad;

    const dividedWidth = (gridSpace + gridGap) / (cardWidth + gridGap);

    setNumCols(Math.floor(dividedWidth));
  }

  function fetchCollection() {
    if (typeof encodedId !== "string") return;

    const collectionId = ItemToURL.decode(encodedId);
    if (!collectionId) return;

    axios
      .get(`/api/collection/${collectionId}`)
      .then((res) => {
        /** @type {CollectionWithGarments} */
        const collection = res.data;
        if (!collection) return;

        setHeaderState({
          title: collection.name,
          back: "/create",
        });

        setCollection(collection);

        const garments = collection.garments || [];
        setGarments(garments.reverse());
      })
      .catch(console.log);
  }

  function saveRenamedGarment(newName = "Untitled") {
    const garment = activeTask?.garment;
    const updated = GarmentTypes[garment?.type]?.from(garment);
    if (!updated || !garment?.id) return false;

    updated.rename(newName);
    return axios
      .put(`/api/garment/${garment.id}`, { garment: updated.serialize() })
      .then(() => (fetchCollection(), true))
      .catch((err) => (console.log(err), false));
  }

  function deleteGarment() {
    const garment = activeTask?.garment;
    if (!garment?.id) return false;

    return axios
      .delete(`/api/garment/${garment.id}`)
      .then(() => (fetchCollection(), true))
      .catch((err) => (console.log(err), false));
  }

  return (
    <div
      className="collection-grid"
      style={{
        opacity: +(numCols >= 0),
        // @ts-ignore
        "--num-cols": Math.max(1, numCols),
      }}
      ref={setGridRef}
    >
      <Head>
        <title>{collection?.name} | Designer App</title>
      </Head>

      {garments?.map((garment, idx) => (
        <GarmentCard key={idx} garment={garment} />
      ))}

      <MoveGarmentModal
        activeTask={activeTask}
        setActiveTask={setActiveTask}
        onMove={fetchCollection}
      />

      <RenameItemModal
        title="Rename Garment"
        inputLabel="Garment Name"
        originalName={activeTask?.garment?.name}
        activeTask={activeTask}
        setActiveTask={setActiveTask}
        onSaveClick={saveRenamedGarment}
      />

      <DeleteItemModal
        title="Delete Garment"
        activeTask={activeTask}
        setActiveTask={setActiveTask}
        onConfirmDelete={deleteGarment}
      >
        <p className="text-center">
          The garment named <b>{activeTask?.garment?.name}</b> will be
          permanently deleted. Are you sure?
        </p>
        <br />
      </DeleteItemModal>
    </div>
  );
}
