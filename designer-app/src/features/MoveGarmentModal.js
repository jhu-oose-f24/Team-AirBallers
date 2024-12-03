"use client";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import SelectField from "@/components/SelectField";
import { IconHanger } from "@tabler/icons-react";
import { useState } from "react";

/**
 * @type {{
 *   [k: string]: Partial<Collection & { numItems: number }>;
 * }}
 */
const collections = {
  19264975926139: {
    name: "Collection 1",
    numItems: 17,
  },
  198498162912414: {
    name: "Drafts",
    numItems: 1,
  },
  6726198491254134: {
    name: "Other Stuff",
    numItems: 5,
  },
};

/** @param {ItemActionModalProps} props */
const MoveGarmentModal = (props) => {
  const { activeTask, setActiveTask } = props;

  /** @type {UseState<string>} */
  const [newCollection, setNewCollection] = useState("");

  const original = "198498162912414";
  const diffCollection = newCollection && newCollection !== original;

  function cancel() {
    setActiveTask(null);
  }

  return (
    <Modal
      title="Move Garment"
      className="move-garment"
      openState={[activeTask?.action === "move", cancel]}
    >
      <p className="text-center mx-[0.8rem]">
        Garment to be moved:
        <br />
        <b>(Garment Name)</b>
      </p>

      <p className="prev-collection flex mx-[0.8rem]">
        From:
        <span className="name">
          {collections[original]?.name}
          <span className="num-items">
            {diffCollection
              ? collections[original]?.numItems - 1
              : collections[original]?.numItems}
            <IconHanger className="-scale-x-100" stroke={2.4} />
          </span>
        </span>
      </p>

      <SelectField
        className="collection-select-field"
        options={Object.entries(collections).map(([value, collection]) => ({
          value,
          label: collection.name,
          selected: value === original,
          render: (
            <>
              <span>{collection.name}</span>

              {collection.numItems > 0 && (
                <span className="num-items">
                  {collection.numItems}
                  <IconHanger className="-scale-x-100" stroke={2.4} />
                </span>
              )}
            </>
          ),
        }))}
        value={newCollection}
        placeholder="Select new collection"
        onChange={(e) => setNewCollection(e.target.value)}
      />

      <p
        className="new-collection flex mx-[0.8rem]"
        style={{ opacity: +diffCollection }}
      >
        To:
        <span className="name">
          {collections[newCollection]?.name}
          <span className="num-items">
            {collections[newCollection]?.numItems + 1}
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
          onClick={cancel}
        />
        <Button
          label="Move"
          yPad="0.3rem"
          width="100%"
          disabled={!diffCollection}
          // TODO: onClick
        />
      </span>
    </Modal>
  );
};

export default MoveGarmentModal;
