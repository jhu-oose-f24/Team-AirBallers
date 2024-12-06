import Button from "@/components/Button";
import Modal from "@/components/Modal";
import SelectField from "@/components/SelectField";
import { pause } from "@/util/misc";
import { IconCheck, IconHanger } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";

/** @param {GarmentMoveModalProps} props */
const MoveGarmentModal = (props) => {
  const { activeTask, setActiveTask, onMove } = props;

  const actionMove = activeTask?.action === "move";
  const oldCollectionId = activeTask?.garment?.collectionId;

  /** @type {UseState<{ [K: string]: CollectionWithGarmentCount }>} */
  const [collections, setCollections] = useState({});
  /** @type {UseState<string>} */
  const [newCollectionId, setNewCollectionId] = useState(oldCollectionId);
  const [isOpen, setIsOpen] = useState(actionMove);
  const [garmentMoved, setGarmentMoved] = useState(false);
  const [moving, setMoving] = useState(false);

  const diffCollection = newCollectionId !== oldCollectionId;

  useEffect(() => {
    setNewCollectionId(oldCollectionId);
  }, [oldCollectionId]);

  useEffect(() => {
    if (!actionMove) return;

    setIsOpen(true);
    setGarmentMoved(false);
    axios
      .get("/api/collections/garment-count")
      .then((res) => {
        /** @type {CollectionWithGarmentCount[]} */
        const collections = res.data;

        setCollections(
          collections.reduce((map, collection) => {
            map[collection?.id] = collection;
            return map;
          }, {}),
        );
      })
      .catch(console.log);
  }, [activeTask]);

  async function closeMove() {
    setIsOpen(false);
    await pause(500);
    setActiveTask(null);
  }

  async function moveGarment() {
    const garment = activeTask?.garment;
    if (!garment) return;

    setMoving(true);
    const moved = await axios
      .put(`/api/garment/${garment.id}/move`, {
        oldCollectionId,
        newCollectionId,
      })
      .then(() => (onMove?.(), true))
      .catch(() => false);

    setMoving(false);

    if (moved) {
      setGarmentMoved(true);
      await pause(1000);
      closeMove();
    } else {
      // TODO: shake button
    }
  }

  return (
    <Modal
      title="Move Garment"
      className="move-garment"
      openState={[isOpen, closeMove]}
    >
      <p className="text-center mx-[0.8rem]">
        Garment to be moved:
        <br />
        <b>{activeTask?.garment?.name}</b>
      </p>

      <p className="prev-collection flex mx-[0.8rem]">
        From:
        <span className="name">
          {collections?.[oldCollectionId]?.name}
          <span className="num-items">
            {diffCollection
              ? collections?.[oldCollectionId]?.numGarments - 1
              : collections?.[oldCollectionId]?.numGarments}
            <IconHanger className="-scale-x-100" stroke={2.4} />
          </span>
        </span>
      </p>

      <SelectField
        className="collection-select-field"
        options={Object.entries(collections).map(([id, collection]) => ({
          value: id,
          label: collection.name,
          selected: id === oldCollectionId,
          render: (
            <>
              <span>{collection.name}</span>

              {collection.numGarments > 0 && (
                <span className="num-items">
                  {collection.numGarments}
                  <IconHanger className="-scale-x-100" stroke={2.4} />
                </span>
              )}
            </>
          ),
        }))}
        value={newCollectionId}
        placeholder="Select new collection"
        onChange={(e) => setNewCollectionId(e.target.value)}
      />

      <p
        className="new-collection flex mx-[0.8rem]"
        style={{ opacity: +diffCollection }}
      >
        To:
        <span className="name">
          {collections?.[newCollectionId]?.name}
          <span className="num-items">
            {collections?.[newCollectionId]?.numGarments + 1}
            <IconHanger className="-scale-x-100" stroke={2.4} />
          </span>
        </span>
      </p>

      <span className="flex gap-[0.5rem] mt-[0.5rem]">
        <Button
          variant="secondary"
          bgColor="var(--primary-lightest)"
          label="Cancel"
          xPad="1.6rem"
          yPad="0.3rem"
          onClick={closeMove}
        />
        <Button
          label={garmentMoved ? "Moved" : "Move"}
          icon={garmentMoved && <IconCheck className="!stroke-[2.6]" />}
          yPad="0.3rem"
          width="100%"
          onClick={moveGarment}
          disabled={!diffCollection}
          loading={moving}
        />
      </span>
    </Modal>
  );
};

export default MoveGarmentModal;
