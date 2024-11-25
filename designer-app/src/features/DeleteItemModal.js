"use client";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { paletteFrom } from "@/util/tint";
import { IconAlertCircle } from "@tabler/icons-react";

/** @param {ItemDeleteModalProps} props */
const DeleteItemModal = (props) => {
  const { children, title, activeTask, setActiveTask } = props;

  function cancel() {
    setActiveTask(null);
  }

  return (
    <Modal
      title={title}
      className="delete-item"
      openState={[activeTask?.action === "delete", cancel]}
    >
      <span className="confirm-delete-msg" style={{ ...paletteFrom("red") }}>
        <IconAlertCircle height="1.6rem" stroke={2.7} />
        This action cannot be undone!
      </span>

      {children}

      <span className="flex gap-[0.5rem]">
        <Button
          variant="secondary"
          bgColor="var(--primary-lightest)"
          label="Cancel"
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

export default DeleteItemModal;
