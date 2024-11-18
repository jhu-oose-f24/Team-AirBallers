"use client";

import ClothButton from "@/components/ClothButton";
import ScrollContainer from "@/components/ScrollContainer";
import Stitches from "@/components/Stitches";
import ReactModal from "react-modal";
import css from "../styles/Modal.module.css";

/** @param {ModalProps} props */
const Modal = (props) => {
  const {
    title = "Modal Title",
    openState,
    onAfterOpen,
    onAfterClose,
    children,
  } = props;

  const [isOpen, setIsOpen] = openState;

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
          <ScrollContainer className={css["modal-inner-container"]}>
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
