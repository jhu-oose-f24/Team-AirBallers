"use client";

import ClothButton from "@/components/ClothButton";
import ScrollContainer from "@/components/ScrollContainer";
import Stitches from "@/components/Stitches";
import css from "@/styles/Modal.module.css";
import { pause } from "@/util/misc";
import clsx from "clsx";
import ReactModal from "react-modal";

const focusableElts = [
  "input:not(:disabled):not([tabindex='-1'])",
  "textarea:not(:disabled):not([tabindex='-1'])",
  "button:not(:disabled):not([tabindex='-1'])",
].join(",");

/** @param {ModalProps} props */
const Modal = (props) => {
  const {
    title = "Modal Title",
    className,
    openState,
    onAfterOpen,
    onAfterClose,
    children,
  } = props;

  const [isOpen, setIsOpen] = openState;

  /** @param {import("overlayscrollbars").OverlayScrollbars} inst */
  async function focusWithin(inst) {
    const content = inst?.elements().content;

    const elt = content?.querySelector?.(focusableElts);

    if (elt instanceof HTMLElement) {
      await pause(200);
      elt.focus();
    }
  }

  return (
    <ReactModal
      overlayClassName={{
        base: css["modal-overlay"],
        afterOpen: css["after-open"],
        beforeClose: css["before-close"],
      }}
      className={clsx(css["modal-patch"], className)}
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={() => setIsOpen(false)}
      onAfterClose={onAfterClose}
      closeTimeoutMS={200}
      shouldCloseOnOverlayClick
      ariaHideApp={false}
    >
      <div className={css["modal-border"]}>
        <div className={css["modal-content"]}>
          <div className={css["modal-header"]}>
            <span className={css["title"]}>{title}</span>
            <ClothButton type="cross" onClick={() => setIsOpen(false)} />
          </div>
          <Stitches
            type="line"
            svgClass="!px-[0.6rem] items-center"
            stitchWidth="0.2rem"
            stitchLength="long"
            stitchSpacing="short"
            centered
          />
          <ScrollContainer
            className={css["modal-inner-container"]}
            onInitialized={focusWithin}
          >
            {children}
          </ScrollContainer>
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
