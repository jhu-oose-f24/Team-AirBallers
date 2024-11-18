"use client";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { SideBarContext } from "@/context/SideBarContext";
import { useContext } from "react";

const DeleteCollectionModal = () => {
  // prettier-ignore
  const { 
    collectionToDelete: toDelete, 
    setCollectionToDelete: setToDelete 
  } = useContext(SideBarContext);

  return (
    <Modal
      title="Delete Collection"
      openState={[!!toDelete, () => setToDelete(null)]}
    >
      Are you sure you want to delete {"<collection-name>"}?
      <br />
      This action cannot be undone
      <span className="flex gap-[0.5rem]">
        <Button
          variant="secondary"
          label="Cancel"
          xPad="1.5rem"
          yPad="0.3rem"
        />
        <Button label="Delete" yPad="0.3rem" width="100%" />
      </span>
    </Modal>
  );
};

export default DeleteCollectionModal;
