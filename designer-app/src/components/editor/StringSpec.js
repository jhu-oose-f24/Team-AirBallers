import InputField from "@/components/InputField";
import { EditorContext } from "@/context/EditorContext";
import StringSpec from "@/types/StringSpec";
import { useContext, useState } from "react";

/** @param {SpecEditorProps<typeof StringSpec>} props */
const StringSpecEditor = (props) => {
  const { name, spec } = props;

  const [_, setLastUpdated] = useContext(EditorContext).updatedState;

  const [value, setValue] = useState(spec?.value);

  return (
    <InputField
      label={name}
      value={value}
      placeholder="None"
      onChange={(e) => {
        spec?.setValue(e.target.value);
        setValue(e.target.value);
        setLastUpdated(Date.now());
      }}
    />
  );
};

export default StringSpecEditor;
