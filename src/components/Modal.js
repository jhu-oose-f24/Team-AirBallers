"use client";

import Stitches from "@/components/Stitches";
import { IconX } from "@tabler/icons-react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useState } from "react";
import ReactModal from "react-modal";
import css from "../styles/Modal.module.css";

/**
 * @param {{
 *   openState: UseState<boolean>;
 *   children?: React.ReactNode;
 * }} props
 */
const Modal = (props) => {
  const { openState, children } = props;

  const [isOpen, setIsOpen] = openState;
  const [afterOpen, setAfterOpen] = useState(false);
  const [beforeClose, setBeforeClose] = useState(false);

  return (
    <ReactModal
      overlayClassName={{
        base: css["modal-overlay"],
        afterOpen: css["after-open"],
        beforeClose: css["before-close"],
      }}
      className={css["modal-patch"]}
      isOpen={isOpen}
      onAfterOpen={() => setAfterOpen(true)}
      onRequestClose={() => setIsOpen(false)}
      closeTimeoutMS={200}
      shouldCloseOnOverlayClick
      shouldFocusAfterRender
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
          <OverlayScrollbarsComponent className="modal-inner-content" defer>
            {children}
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
