import Button from "@/components/Button";
import InputField from "@/components/InputField";
import Modal from "@/components/Modal";
import { pause } from "@/util/misc";
import { IconCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";

/** @param {ItemRenameModalProps} props */
const RenameItemModal = (props) => {
  const {
    title,
    originalName = "Untitled",
    inputLabel,
    activeTask,
    setActiveTask,
    onSaveClick,
  } = props;

  const actionRename = activeTask?.action === "rename";
  const [isOpen, setIsOpen] = useState(actionRename);
  const [itemName, setItemName] = useState(originalName);
  const [itemSaved, setItemSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setItemName(originalName);
  }, [originalName]);

  useEffect(() => {
    if (actionRename) {
      setIsOpen(true);
      setItemSaved(false);
    }
  }, [activeTask]);

  async function closeRename() {
    setIsOpen(false);
    await pause(500);
    setActiveTask(null);
  }

  async function saveRename() {
    setSaving(true);
    const saved = await onSaveClick?.(itemName);
    setSaving(false);

    if (saved) {
      setItemSaved(true);
      await pause(1000);
      closeRename();
    } else {
      // TODO: shake button
    }
  }

  return (
    <Modal
      title={title}
      className="rename-item"
      openState={[isOpen, closeRename]}
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
          onClick={closeRename}
        />
        <Button
          label={itemSaved ? "Saved" : "Save"}
          icon={itemSaved && <IconCheck className="!stroke-[2.7]" />}
          yPad="0.3rem"
          width="100%"
          onClick={saveRename}
          disabled={originalName === itemName}
          loading={saving}
        />
      </span>
    </Modal>
  );
};

export default RenameItemModal;
