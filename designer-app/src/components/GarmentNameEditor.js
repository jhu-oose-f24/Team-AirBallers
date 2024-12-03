"use client";

import Button from "@/components/Button";
import InputField from "@/components/InputField";
import Tooltip from "@/components/Tooltip";
import { RootContext } from "@/context/RootContext";
import css from "@/styles/GarmentNameEditor.module.css";
import { pause } from "@/util/misc";
import {
  IconCheck,
  IconCircleCheckFilled,
  IconCopy,
  IconPencil,
} from "@tabler/icons-react";
import clsx from "clsx";
import { useContext, useRef, useState } from "react";

const GarmentNameEditor = (props) => {
  const { bodyRef } = useContext(RootContext);

  const [editingName, setEditingName] = useState(false);
  const [nameCopied, setNameCopied] = useState(false);
  const [newName, setNewName] = useState("Garment Name");
  /** @type {UseState<HTMLElement>} */
  const [copyIcon, setCopyIcon] = useState(null);
  /** @type {UseState<HTMLElement>} */
  const [copyButton, setCopyButton] = useState(null);
  /** @type {React.MutableRefObject<HTMLElement>} */
  const nameFieldRef = useRef(null);

  const CopyIcon = nameCopied ? IconCircleCheckFilled : IconCopy;

  function toggleEditMode() {
    if (!editingName) {
      setNameCopied(false);
      nameFieldRef.current?.focus();
    } else if (!newName) {
      setNewName("Untitled");
    }
    setEditingName(!editingName);
  }

  async function copyToClipboard() {
    if (nameCopied) return;

    navigator?.clipboard.writeText(newName);
    setNameCopied(true);
    await pause(3300);
    setCopyIcon((icon) => {
      if (icon) {
        icon.style.opacity = "0";
      }
      return icon;
    });
    await pause(200);
    setNameCopied(false);
  }

  return (
    <span className="flex gap-[0.6rem]">
      <span
        className={clsx(css["garment-name"], editingName && css["editing"])}
      >
        <Tooltip
          disabled={!copyIcon}
          visible={nameCopied ? !!copyIcon : undefined}
          content={nameCopied ? "Copied to Clipboard!" : "Copy"}
          hideAfterMS={nameCopied && 2500}
          reference={copyIcon}
          triggerTarget={nameCopied ? null : copyButton}
          trigger={nameCopied ? undefined : "mouseenter focusin"}
          appendTo={bodyRef}
          offset={[0, 30]}
          delay={[750, 0]}
        >
          <Button
            className={clsx(css["copy-name"], nameCopied && css.copied)}
            variant="hint"
            label={newName}
            icon={
              !editingName && (
                <CopyIcon
                  className={css["copy-icon"]}
                  // @ts-ignore
                  ref={setCopyIcon}
                />
              )
            }
            onClick={copyToClipboard}
            tabIndex={editingName ? -1 : undefined}
            fontSize={editingName ? "1.2rem" : "1.4rem"}
            xPad="0.8rem"
            yPad={editingName ? "0.8rem" : "1.05rem"}
            stretch={!editingName}
            reverse={nameCopied}
            align="space-between"
            ref={setCopyButton}
          />
        </Tooltip>
        <InputField
          className={css["name-input"]}
          value={newName}
          width="100%"
          readOnly={!editingName}
          tabIndex={!editingName ? -1 : undefined}
          onChange={(e) => setNewName(e.target.value)}
          ref={nameFieldRef}
        />
      </span>

      <Button
        variant="secondary"
        icon={editingName ? <IconCheck /> : <IconPencil />}
        fontSize="1.6rem"
        xPad="0.7rem"
        yPad="0.5rem"
        onClick={toggleEditMode}
      />
    </span>
  );
};

export default GarmentNameEditor;
