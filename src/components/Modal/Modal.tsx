import { createPortal } from "react-dom";
import css from "./Modal.module.css";

const Modal = () => {
  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true">
      <div className={css.modal}>{/* */}</div>
    </div>,
    document.getElementById("modal") as HTMLDivElement,
  );
};

export default Modal;
