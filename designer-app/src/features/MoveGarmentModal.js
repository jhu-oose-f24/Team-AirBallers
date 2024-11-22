"use client";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import SelectField from "@/components/SelectField";
import { IconHanger } from "@tabler/icons-react";

/** @type {Partial<Collection & { numItems: number }>[]} */
const collections = [
  {
    id: "19264975926139",
    name: "Collection 1",
    numItems: 17,
  },
  {
    id: "198498162912414",
    name: "Drafts",
    numItems: 1,
  },
  {
    id: "6726198491254134",
    name: "Other Stuff",
    numItems: 5,
  },
];

/** @param {ItemActionModalProps} props */
const MoveGarmentModal = (props) => {
  const { activeTask, setActiveTask } = props;

  function cancel() {
    setActiveTask(null);
  }

  return (
    <Modal
      title="Move Garment"
      className="move-garment"
      openState={[activeTask?.action === "move", cancel]}
    >
      <SelectField
        options={collections.map((collection) => ({
          id: collection.id,
          label: collection.name,
          selected: collection.id === "198498162912414",
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
        style={{ margin: "0.7rem" }}
      />
      <span className="flex gap-[0.5rem]">
        <Button
          variant="secondary"
          bgColor="var(--primary-lightest)"
          label="Cancel"
          borderRadius="0.65rem"
          xPad="1.6rem"
          yPad="0.3rem"
          width="100%"
          onClick={cancel}
        />
        <Button
          label="Move"
          yPad="0.3rem"
          width="100%"
          // TODO: onClick
        />
      </span>
    </Modal>
  );
};

export default MoveGarmentModal;
