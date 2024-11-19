"use client";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { SideBarContext } from "@/context/SideBarContext";
import { paletteFrom } from "@/util/tint";
import { IconAlertCircle } from "@tabler/icons-react";
import { useContext } from "react";

const DeleteCollectionModal = () => {
  const { activeTask, setActiveTask } = useContext(SideBarContext);

  const isOpen = activeTask?.collection && activeTask.action === "delete";

  function cancel() {
    setActiveTask(null);
  }

  return (
    <Modal
      title="Delete Collection"
      className="delete-collection"
      openState={[isOpen, cancel]}
    >
      <span className="confirm-delete-msg" style={{ ...paletteFrom("red") }}>
        <IconAlertCircle height="1.6rem" stroke={2.7} />
        This action cannot be undone!
      </span>

      {/* TODO: get collection name and # garments */}
      <span>
        The <b>(Collection Name)</b> collection will be permanently deleted
        along with the following contents:
      </span>
      <ul>
        <li>
          <b>(Number)</b> Garments
        </li>
      </ul>

      <br />
      <span className="flex gap-[0.5rem]">
        <Button
          variant="secondary"
          bgColor="var(--primary-lightest)"
          label="Cancel"
          borderRadius="0.65rem"
          xPad="1.6rem"
          yPad="0.3rem"
          width="60%"
          onClick={cancel}
        />
        <Button
          tint="red"
          label="Delete"
          yPad="0.3rem"
          width="40%"
          // TODO: onClick
        />
      </span>
    </Modal>
  );
};

export default DeleteCollectionModal;
