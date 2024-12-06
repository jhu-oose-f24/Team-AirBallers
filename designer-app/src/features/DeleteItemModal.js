import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { pause } from "@/util/misc";
import { dangerColor, dangerPalette } from "@/util/tint";
import { IconAlertCircle } from "@tabler/icons-react";
import Head from "next/head";
import { useEffect, useState } from "react";

/** @param {ItemDeleteModalProps} props */
const DeleteItemModal = (props) => {
  const { children, title, activeTask, setActiveTask, onConfirmDelete } = props;

  const actionDelete = activeTask?.action === "delete";
  const [isOpen, setIsOpen] = useState(actionDelete);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (actionDelete) setIsOpen(true);
  }, [activeTask]);

  async function closeDelete() {
    setIsOpen(false);
    await pause(500);
    setActiveTask(null);
  }

  async function deleteItem() {
    setDeleting(true);
    const saved = await onConfirmDelete?.();
    setDeleting(false);

    if (saved) {
      closeDelete();
    } else {
      // TODO: shake button
    }
  }

  return (
    <Modal
      title={title}
      className="delete-item"
      openState={[isOpen, closeDelete]}
    >
      <Head>
        <title>{title} | Designer App</title>
      </Head>

      <span className="confirm-delete-msg" style={dangerPalette}>
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
          onClick={closeDelete}
        />
        <Button
          tint={dangerColor}
          label="Delete"
          yPad="0.3rem"
          width="40%"
          onClick={deleteItem}
          loading={deleting}
        />
      </span>
    </Modal>
  );
};

export default DeleteItemModal;
