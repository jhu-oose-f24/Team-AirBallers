import SelectField from "@/components/SelectField";
import { EditorContext } from "@/context/EditorContext";
import EnumSpec from "@/types/EnumSpec";
import { useContext, useState } from "react";

/** @param {SpecEditorProps<typeof EnumSpec>} props */
const EnumSpecEditor = (props) => {
  const { name, spec } = props;

  const [_, setLastUpdated] = useContext(EditorContext).updatedState;

  const [value, setValue] = useState(spec?.value);

  return (
    <SelectField
      label={name}
      options={spec?.possibleValues.map((option) => ({
        value: option,
        label: option,
      }))}
      value={value}
      // TODO: use immer.js
      onChange={(e) => {
        spec?.setValue(e.target.value);
        setValue(e.target.value);
        setLastUpdated(Date.now());
      }}
    />
  );
};

export default EnumSpecEditor;
