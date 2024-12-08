import Tooltip from "@/components/Tooltip";
import { EditorContext } from "@/context/EditorContext";
import css from "@/styles/editor/ColorSpec.module.css";
import ColorSpec from "@/types/ColorSpec";
import chroma from "chroma-js";
import clsx from "clsx";
import { useContext, useState } from "react";
import { HexColorPicker } from "react-colorful";

/** @param {SpecEditorProps<typeof ColorSpec>} props */
const ColorSpecEditor = (props) => {
  const { name, spec } = props;

  const [_, setLastUpdated] = useContext(EditorContext).updatedState;

  const [color, setColor] = useState(spec?.value);
  const [showPicker, setShowPicker] = useState(false);

  function borderClass() {
    const [h, s, l] = chroma(spec?.value).hsl();

    return l > 0.4 ? css.dark : css.light;
  }

  return (
    <div className={clsx(css["spec-editor"], borderClass())}>
      <span className={css["spec-label"]}>{name}</span>

      <Tooltip
        className={css["color-picker"]}
        content={
          <HexColorPicker
            className={clsx("color-picker", css.container)}
            color={color}
            onChange={(color) => {
              setColor(color);
              spec?.setValue(color);
              setLastUpdated(Date.now());
            }}
          />
        }
        onHide={() => setShowPicker(false)}
        onClickOutside={(inst) => inst.hide()}
        interactive
        visible={showPicker}
        placement="top-end"
        trigger={undefined}
        arrow={false}
        delay={0}
      >
        <span
          className={css["color-preview"]}
          style={{ background: spec?.value }}
          onClick={() => setShowPicker(!showPicker)}
          tabIndex={0}
        />
      </Tooltip>
    </div>
  );
};

export default ColorSpecEditor;
