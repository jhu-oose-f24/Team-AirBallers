"use client";

import GarmentCard from "@/components/GarmentCard";
import { RootContext } from "@/context/RootContext";
import DeleteItemModal from "@/features/DeleteItemModal";
import MoveGarmentModal from "@/features/MoveGarmentModal";
import RenameItemModal from "@/features/RenameItemModal";
import { useBodyID, useOnResize } from "@/util/hooks";
import { pause } from "@/util/misc";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function CollectionView() {
  const { sideBarOpen, setHeaderState, activeTask, setActiveTask } =
    useContext(RootContext);

  /** @type {UseState<HTMLElement>} */
  const [gridRef, setGridRef] = useState(null);
  const [numCols, setNumCols] = useState(-1);

  const [garments, setGarments] = useState([]);

  useBodyID("collection-page");

  useOnResize(() => calcGridColumns(), [gridRef]);

  useEffect(() => {
    if (!gridRef) return;

    if (numCols < 0) {
      const delaySeconds = getComputedStyle(gridRef).transitionDuration;
      pause(parseFloat(delaySeconds) * 1000).then(calcGridColumns);
    } else {
      calcGridColumns();
    }
  }, [gridRef, sideBarOpen]);

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
      {Array(20)
        .fill({})
        // TODO: get real garments
        .map((garment, idx) => (
          <GarmentCard
            key={idx}
            // @ts-ignore
            garment={garment}
          />
        ))}

      <MoveGarmentModal activeTask={activeTask} setActiveTask={setActiveTask} />

      <RenameItemModal
        title="Rename Garment"
        inputLabel="Garment Name"
        originalName="(Unknown)"
        activeTask={activeTask}
        setActiveTask={setActiveTask}
        // TODO: save garment name
        onSaveClick={null}
      />

      <DeleteItemModal
        title="Delete Garment"
        activeTask={activeTask}
        setActiveTask={setActiveTask}
      >
        {/* TODO: get garment name */}
        <p>
          The garment named <b>(Garment Name)</b> will be permanently deleted.
          Are you sure?
        </p>
        <br />
      </DeleteItemModal>
    </div>
  );
}
