"use client";

import Button from "@/components/Button";
import InputField from "@/components/InputField";
import Modal from "@/components/Modal";
import { SideBarContext } from "@/context/SideBarContext";
import { useContext, useState } from "react";

const RenameCollectionModal = () => {
  const { activeTask, setActiveTask } = useContext(SideBarContext);

  const [collectionName, setCollectionName] = useState("(Collection Name)");

  const isOpen = activeTask?.collection && activeTask.action === "rename";

  function cancel() {
    setActiveTask(null);
  }

  return (
    <Modal
      title="Rename Collection"
      className="rename-collection"
      openState={[isOpen, cancel]}
    >
      <InputField
        label="Collection Name"
        placeholder={activeTask?.collection?.name || "(Collection Name)"}
        value={collectionName}
        onChange={(e) => setCollectionName(e.target.value)}
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
          onClick={cancel}
        />
        <Button
          label="Save"
          yPad="0.3rem"
          width="100%"
          // TODO: onClick
        />
      </span>
    </Modal>
  );
};

export default RenameCollectionModal;
