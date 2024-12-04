import SelectField from "@/components/SelectField";
import EnumSpec from "@/types/EnumSpec";
import { useState } from "react";

/** @param {SpecEditorProps<typeof EnumSpec>} props */
const EnumSpecEditor = (props) => {
  const { name, spec } = props;

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
      }}
    />
  );
};

export default EnumSpecEditor;
