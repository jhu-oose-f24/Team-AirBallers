import Button from "@/components/Button";
import InputField from "@/components/InputField";
import Modal from "@/components/Modal";
import { pause } from "@/util/misc";
import { IconCheck } from "@tabler/icons-react";
import axios from "axios";
import Head from "next/head";
import { useState } from "react";

/** @param {CollectionCreateModalProps} props */
const CreateCollectionModal = (props) => {
  const { openState, onCreate } = props;

  const [isOpen, setIsOpen] = openState;
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState(false);
  const [name, setName] = useState("");

  async function closeCreate() {
    setIsOpen(false);
    await pause(500);
    setName("");
  }

  async function createCollection() {
    if (!name) return;

    setCreating(true);
    const created = await axios
      .post("/api/collection/create", { name })
      .then((res) => {
        const newCollection = res.data;
        onCreate?.((prev) => [newCollection, ...prev]);
        return true;
      })
      .catch((err) => (console.log(err), false));

    setCreating(false);

    if (created) {
      setCreated(true);
      await pause(1000);
      closeCreate();
    } else {
      // TODO: shake button
    }
  }

  return (
    <Modal
      title="Create Collection"
      className="create-collection"
      openState={[isOpen, closeCreate]}
    >
      <Head>
        <title>Create Collection | Designer App</title>
      </Head>

      <InputField
        label="Collection Name"
        placeholder="My Custom Garments"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <span className="flex gap-[0.5rem] mt-[0.5rem]">
        <Button
          variant="secondary"
          bgColor="var(--primary-lightest)"
          label="Cancel"
          xPad="1.6rem"
          yPad="0.3rem"
          onClick={closeCreate}
        />
        <Button
          label={created ? "Created" : "Create"}
          icon={created && <IconCheck className="!stroke-[2.6]" />}
          yPad="0.3rem"
          width="100%"
          onClick={createCollection}
          disabled={!name}
          loading={creating}
        />
      </span>
    </Modal>
  );
};

export default CreateCollectionModal;
