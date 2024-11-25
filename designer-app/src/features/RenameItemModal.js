"use client";

import Button from "@/components/Button";
import InputField from "@/components/InputField";
import Modal from "@/components/Modal";
import { useState } from "react";

/** @param {ItemRenameModalProps} props */
const RenameItemModal = (props) => {
  const {
    title,
    originalName,
    inputLabel,
    activeTask,
    setActiveTask,
    onSaveClick,
  } = props;

  const [itemName, setItemName] = useState(originalName || "Untitled");

  function cancel() {
    setActiveTask(null);
  }

  return (
    <Modal
      title={title}
      className="rename-item"
      openState={[activeTask?.action === "rename", cancel]}
    >
      <InputField
        className="item-rename-field"
        label={inputLabel}
        placeholder={originalName}
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />

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
          label="Save"
          yPad="0.3rem"
          width="100%"
          onClick={onSaveClick}
          disabled={originalName === itemName}
        />
      </span>
    </Modal>
  );
};

export default RenameItemModal;
