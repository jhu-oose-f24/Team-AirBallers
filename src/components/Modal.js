"use client";

import InputField from "@/components/InputField";
import Button from "@/components/Button";
import Stitches from "@/components/Stitches";
import { IconX } from "@tabler/icons-react";
import { ClickScrollPlugin, OverlayScrollbars } from "overlayscrollbars";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import ReactModal from "react-modal";
import css from "../styles/Modal.module.css";

/** @param {ModalProps} props */
const Modal = (props) => {
  const { openState, onAfterOpen, onAfterClose, children } = props;

  const [isOpen, setIsOpen] = openState;

  OverlayScrollbars.plugin(ClickScrollPlugin);

  /** @type {typeof onAfterOpen} */
  function handleAfterOpen(options) {
    const modal = options.contentEl;
    modal?.querySelector("input")?.focus();
    onAfterOpen?.(options);
  }

  return (
    <ReactModal
      overlayClassName={{
        base: css["modal-overlay"],
        afterOpen: css["after-open"],
        beforeClose: css["before-close"],
      }}
      className={css["modal-patch"]}
      isOpen={isOpen}
      onAfterOpen={handleAfterOpen}
      onRequestClose={() => setIsOpen(false)}
      onAfterClose={onAfterClose}
      closeTimeoutMS={200}
      shouldCloseOnOverlayClick
      ariaHideApp={false}
    >
      <div className={css["modal-border"]}>
        <div className={css["modal-content"]}>
          <div className={css["modal-header"]}>
            <span className={css["title"]}>Modal Title</span>
            <IconX
              className={css["close-btn"]}
              onClick={() => setIsOpen(false)}
            />
          </div>
          <Stitches
            type="line"
            svgClass="!px-[0.6rem] items-center"
            stitchWidth="0.2rem"
            stitchLength="long"
            stitchSpacing="short"
          />
          <OverlayScrollbarsComponent
            className={css["modal-inner-container"]}
            options={{ scrollbars: { clickScroll: true } }}
            defer
          >
            {children}
            <div className="flex flex-col gap-[0.7rem]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum vitae erat quis urna luctus volutpat. Aenean tortor
              turpis, tincidunt non blandit vitae, blandit eget nibh. Morbi
              hendrerit lorem non justo dignissim, nec facilisis tortor
              pellentesque. Maecenas a mollis erat. Ut tristique nisi id auctor
              mattis. Nullam ultricies tincidunt sollicitudin. Curabitur
              pharetra elit egestas imperdiet mollis. Nam lobortis iaculis augue
              et sodales.
              <br />
              Donec quis lacinia massa. Nam mauris urna, suscipit id lacus quis,
              fringilla porttitor tortor. Aliquam varius tincidunt nisi. Aenean
              at hendrerit magna. Orci varius natoque penatibus et magnis dis
              parturient montes, nascetur ridiculus mus. Nam id cursus purus.
              Suspendisse rutrum mi a arcu bibendum tempus. Proin tristique
              ornare massa sit amet dapibus. Vestibulum fringilla leo id magna
              tincidunt convallis.
              <InputField />
              <InputField />
              <InputField style={{ minWidth: "20rem" }} />
              <Button
                className="!mt-[0.3rem]"
                label="Submit"
                width="100%"
              />
            </div>
          </OverlayScrollbarsComponent>
        </div>
        <Stitches
          type="border"
          stitchWidth="0.24rem"
          stitchLength="short"
          stitchSpacing="short"
          svgClass={css["stitch-wrapper"]}
          pathClass={css.stitches}
        />
      </div>
    </ReactModal>
  );
};

export default Modal;
